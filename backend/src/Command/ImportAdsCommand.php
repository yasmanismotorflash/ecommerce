<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Doctrine\ORM\EntityManagerInterface;
use App\Services\Comun\SimpleLog;

use App\Services\Import\APICORE\APICOREClient;
use App\Services\Import\APICORE\Builders\AdvertisementBuilder;
use App\Entity\Site;
use App\Entity\Advertisement;

#[AsCommand(name: 'backend:import:ads', description: 'Importar anuncios del sitio')]
class ImportAdsCommand extends Command
{
    private EntityManagerInterface $em;
    private APICOREClient $apiCoreClient;
    private bool $debug;
    private bool $dryrun;
    private SimpleLog $log;
    private SymfonyStyle $io;


    public function __construct(SimpleLog $log, EntityManagerInterface $entityManager, APICOREClient $apiCOREClient)
    {
        parent::__construct();
        $this->log = $log;
        $this->log->configure(true,'cmd-import-ads', true);
        $this->em = $entityManager;
        $this->apiCoreClient = $apiCOREClient;
        $this->debug = boolval($_ENV['APP_DEBUG']);
        $this->dryrun = false;
    }

    protected function configure(): void
    {
        $this
          ->setDescription('Importa anuncios desde APICORE para sitio local, parámetros opcionales  dryrun, siteMfId, pageSize, pagesCount')
          ->addOption('dryrun', null, InputOption::VALUE_NONE,'Si se especifica, el comando ejecutará en modo de prueba sin persistir datos en la base de datos')
          ->addOption('pageSize', null, InputOption::VALUE_OPTIONAL,'Número de anuncios a traer por página', 40)
          ->addOption('pagesCount', null, InputOption::VALUE_OPTIONAL,'Número de página a procesar', 0);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io = new SymfonyStyle($input, $output);
        $this->dryrun = $input->getOption('dryrun'); // Activa modo de prueba
        $pageSize = $input->getOption('pageSize'); // Define el tamaño de la página
        $pagesCount = $input->getOption('pagesCount'); // Define la cantidad de paginas a procesar

        $message ='Inicio de importación de anuncios desde APICORE';
        $this->io->title($message); $this->log->info($message);

        // Filtrar sites según el mfsisteid, si se ha especificado o buscar los activos
        $site = $this->em->getRepository(Site::class)->find(1);

        if (!$site) {
            $message = 'No se encontró el sitio.';
            $this->io->warning($message); $this->log->info($message);
            return Command::SUCCESS;
        }

        $this->processSiteAds($site,$pageSize,$pagesCount);

        $this->em->flush();
        $this->io->success('Ejecución completada correctamente.');
        return Command::SUCCESS;
    }


    private function processSiteAds(Site $site, $pageSize = 40, $pagesCount = 0): void
    {
        ini_set('memory_limit', '-1');

        // Configurar inicializar autenticación de apimfclient para el sitio especificado
        $this->initializeAPICoreClient($site);
        $this->io->section("Obteniendo anuncios de sitio: {$site->getName()} ...");
        $page = 1;
        do {
            $response = $this->apiCoreClient->getAdsByPage($pageSize, $page);
            $responseData = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                $message = 'Error al decodificar JSON de respuesta de APICORE.';
                $this->io->error($message); $this->log->error($message);
                return;
            }
            $this->io->text("Procesando anuncios ...");
            $page = intval($responseData['page']);
            $pages = intval($responseData['pages']);

            $ads = $responseData['advertisements'] ?? [];

            foreach ($ads as $ad) {
                gc_enable();
                try {
                    /*** @var Advertisement $advertisement */
                    $advertisement =  AdvertisementBuilder::getAdvertisement($this->em,$site,$ad);
                    if(!$advertisement){
                        // ToDo: Registrar en log que se obtuvo un dato con problema y saltar
                        continue;
                    }

                    // Si no es dryrun, persistimos y guardamos los cambios.
                    if (!$this->dryrun && $advertisement) {
                        $this->em->flush();
                    }

                    $this->io->text(" > Procesado Anuncio ID : ".$advertisement->getMfid());
                }
                catch (\Exception $e) {
                    $this->io->error(" > Error procesando anuncio : ".$e->getMessage());
                    $this->io->error(" > Traza del error : ");
                    print_r($e->getTrace());
                    continue;
                }
                gc_collect_cycles();
            }
            $this->io->section("Procesada página: " . $page . " de " . $pages);

            if($pagesCount != 0 && $pagesCount == $page){
                $this->io->success("No se procesan más páginas, se llegó a la cantidad de páginas especificadas para obtener.  pagesCount = ".$page);
                break;
            }
            $page++;
        } while ($page <= $pages);
        $this->io->success("Procesados " . count($ads) . " anuncios del sitio {$site->getName()}.");
    }



    /**
     * @param Site $site
     * @return void
     */
    public function initializeAPICoreClient(Site $site): void
    {
        $this->apiCoreClient->setApiCoreClientId($site->getApicoreClientId());
        $this->apiCoreClient->setApiCoreClientSecret($site->getApicoreClientSecret());
        $this->apiCoreClient->authenticate();
    }

}
