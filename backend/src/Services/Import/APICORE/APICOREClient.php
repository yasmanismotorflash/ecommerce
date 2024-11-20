<?php
namespace App\Services\Import\APICORE;

use App\Services\Comun\Configuration;
use App\Services\Comun\SimpleLog;
use Symfony\Contracts\HttpClient\HttpClientInterface;

/**
 * Servicio cliente para APICORE
 * @author Eidy Estupiñan Varona <eidy.estupinan@motorflash.com>
 */
class APICOREClient
{
    private ?string $apiCoreUrl;
    private ?string $apiCoreClientId;
    private ?string $apiCoreClientSecret;

    private ?string $token = '';

    private HttpClientInterface $httpClient;

    private bool $debug;

    private Configuration $config;

    private SimpleLog $log;


    public function __construct(Configuration $config, SimpleLog $log, HttpClientInterface $httpClient)
    {
        $config->configure();
        $this->config = $config;
        $log->configure(true,'apicoreclient',true);
        $this->log = $log;
        $this->apiCoreUrl = $config->getParameter('API-CORE-URL')->getValue();
        $this->httpClient = $httpClient;
        $this->debug =  boolval($_ENV['APP_DEBUG']);
    }


    /**
     *  Función para autenticación y obtener token de acceso al APICORE,
     *  mientras el token sea válido usa el actual, si no pide uno nuevo
     */
    public function authenticate()
    {
        $this->ensureToken();
    }


    /**
     *  Función para obtener token de acceso al APICORE,
     */
    private function getToken(): void
    {
        $endpoint = $this->apiCoreUrl . '/auth';
        $payload = ['email' => $this->apiCoreClientId, 'password' => $this->apiCoreClientSecret];
        $response = $this->httpClient->request('POST', $endpoint, ['json' => $payload]);
        $this->debug('Solicitando Token de acceso');

        if ($response->getStatusCode() === 200){
            $this->token = json_decode($response->getContent(), true)['access_token'];
            $this->debug('Token de acceso recibido: '.$this->token);
        }
        else{
            $this->token = '';
            $this->debug('no hay token de acceso. ', 'error');
        }
    }


    /**
     * Funcion para verificar la validez del token de autenticación con
     * un margen de 5 minutos a la fecha hora de expiración del mismo.
     * @return bool true si es válido o false si es vacio o ha expirado
     */
    private function isTokenValid(): bool
    {
        if (empty($this->token)) {
            return false;
        }
        $decodedToken = base64_decode($this->token);
        $expPosition = strpos($decodedToken, '"exp":') + strlen('"exp":');
        $expirationTime = (int)substr($decodedToken, $expPosition, strpos($decodedToken, '}', $expPosition) - $expPosition);
        $expirationThreshold = $expirationTime - (5 * 60);
        return time() <= $expirationThreshold;
    }


    /**
     * Función para asegurar que el token siempre sea válido antes de usarse
     * retorna el token
     * */
    protected function ensureToken(): void
    {
        // Si el token está vacío o ha expirado, se obtiene uno nuevo
        if (!$this->isTokenValid()) {
            $this->getToken();
        }
    }


    /**
     * Función para obtener un anuncio especificando el id de motorflash ad_id
     * @param int $ad_id id de anuncio en apicore
     * @return string (json)
     */
    public function getAdByMfId(int $ad_id): ?string
    {
        $this->ensureToken();
        $endpoint = $this->apiCoreUrl . '/api/advertisement?id=' . $ad_id;
        return $this->httpClient->request('GET', $endpoint, ['headers' => ['Authorization' => ' Bearer ' . $this->token]])->getContent();
    }


    /**
     * Función para obtener un anuncio especificando el Vehicle Identification Number (VIN)
     * @param int $VIN del de anuncio
     * @return string (json)
     */
    public function getAdByVIN(int $VIN): ?string
    {
        $this->ensureToken();
        $endpoint = $this->apiCoreUrl . '/api/advertisement?vin=' . $VIN;
        return $this->httpClient->request('GET', $endpoint, ['headers' => ['Authorization' => ' Bearer ' . $this->token]])->getContent();
    }


    /**
     * Función para obtener un anuncio especificando la placa o matrícula (plate)
     * @param string $plate matricula del de anuncio
     * @return string (json)
     */
    public function getAdByPlate(string $plate): ?string
    {
        $this->ensureToken();
        $endpoint = $this->apiCoreUrl . '/api/advertisement?plate=' . $plate;
        return $this->httpClient->request('GET', $endpoint, ['headers' => ['Authorization' => ' Bearer ' . $this->token]])->getContent();
    }


    /**
     * Función para obtener una lista de anuncios especificando la tienda
     * @param string $shopId id de la tienda
     * @return string (json)
     */
    public function getAdsByShop(string $shopId): ?string
    {
        $this->ensureToken();
        $endpoint = $this->apiCoreUrl . '/api/advertisements?shop=' . $shopId;
        return $this->httpClient->request('GET', $endpoint, ['headers' => ['Authorization' => ' Bearer ' . $this->token]])->getContent();
    }


    /**
     * Función para obtener una lista de anuncios especificando datos de paginado
     * @param string $perPage cantidad por pagina
     * @param string $page pagina solicitada
     * @return string (json)
     */
    public function getAdsByPage(int $perPage = 40, int $page = 1): ?string
    {
        $this->ensureToken();
        $endpoint = $this->apiCoreUrl . '/api/advertisements?perPage=' . $perPage . '&page=' . $page;
        return $this->httpClient->request('GET', $endpoint, ['headers' => ['Authorization' => ' Bearer ' . $this->token]])->getContent();
    }


    public function dumpConfig(): void
    {
        echo 'APICORE URL:' . $this->apiCoreUrl . "\n";
        echo 'APICORE SECRET:' . $this->apiCoreClientSecret . "\n";
        echo 'APICORE TOKEN (Current): ' . $this->token . "\n";
    }

    /**
     * @return string|null
     */
    public function getApiCoreClientId(): ?string
    {
        return $this->apiCoreClientId;
    }

    /**
     * @param string|null $apiCoreClientId
     * @return APICOREClient
     */
    public function setApiCoreClientId(?string $apiCoreClientId): APICOREClient
    {
        $this->apiCoreClientId = $apiCoreClientId;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getApiCoreClientSecret(): ?string
    {
        return $this->apiCoreClientSecret;
    }


    /**
     * @param string|null $apiCoreClientSecret
     * @return APICOREClient
     */
    public function setApiCoreClientSecret(?string $apiCoreClientSecret): APICOREClient
    {
        $this->apiCoreClientSecret = $apiCoreClientSecret;
        return $this;
    }

    private function debug(string $message, string $type='info')
    {
        if($this->debug){
            switch ($type) {
                case 'info':
                    $this->log->info($message);
                    break;
                case 'warn':
                    $this->log->warn($message);
                    break;
                case 'error':
                    $this->log->error($message);
                    break;
                default:
                    $this->log->log($message);
            }
        }

    }

}