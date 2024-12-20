<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Serializer\Filter\PropertyFilter;

#[ORM\Entity]
#[ORM\Table(name: 'advertisements', options: ["comment" => "Tabla para almacenar los anuncios"])]
#[ApiResource( paginationItemsPerPage: 40)]
#[ApiFilter(PropertyFilter::class)]
class Advertisement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    /**
     * ID de anuncio de APICORE
     * */
    #[ORM\Column(type: 'integer', name: 'mfid', options: ["comment" => "Campo mfid, contiene el id usado en motorflash"])]
    private int $mfid;

    #[ORM\Column(type: 'string', length: 20)]
    private string $published;

    #[ORM\Column(type: 'string', length: 50)]
    private string $available;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 100)]
    private string $name;




    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 17)]
    private string $vin;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 20)]
    private string $plate;

    #[ORM\Column(type: 'date', nullable: true)]
    private ?\DateTimeInterface $registrationDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $lastRegistrationDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $manufacturingDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $publicationDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $modificationDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $lastUpdate;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'integer')]
    private int $daysPublished;

    #[ORM\Column(type: 'string', length: 20)]
    private string $jato;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 20)]
    private string $typnatcode;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 50)]
    private string $internalRef;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    private ?string $origen;




    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 50)]
    private string $status;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 50)]
    private string $typeVehicle;

    #[ORM\Column(type: 'string', length: 50)]
    private string $bodyType;

    #[ORM\Column(type: 'string', length: 50)]
    private string $bodyTypeEs;

    #[ORM\Column(type: 'boolean')]
    private bool $iva;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private string $price;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private string $financedPrice;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private string $purchasePrice;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private string $priceNew;


    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'integer')]
    private int $km;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'string', length: 10)]
    private string $cv;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'string', length: 10)]
    private string $kw;

    #[ApiFilter(RangeFilter::class)]
    #[ORM\Column(type: 'integer')]
    private int $cc;

    #[ORM\Column(type: 'string', length: 50)]
    private string $tires_front;

    #[ORM\Column(type: 'string', length: 50)]
    private string $tires_back;


    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    private string $fuel;

    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[ORM\Column(type: 'string', length: 50)]
    private string $color;

    #[ApiFilter(BooleanFilter::class)]
    #[ORM\Column(type: 'boolean')]
    private bool $freeAccidents;




    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    private string $traction;

    #[ORM\Column(type: 'string', length: 50)]
    private string $gearbox;

    #[ORM\Column(type: 'integer')]
    private int $number_of_gears;

    #[ORM\Column(type: 'integer')]
    private int $doors;

    #[ORM\Column(type: 'integer')]
    private int $seats;

    #[ORM\Column(type: 'string', length: 50)]
    private string $environmentalBadge;




    #[ORM\Column(type: 'integer')]
    private int $warrantyDuration;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $quote = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $textLegal = null;


    #[ORM\ManyToOne(inversedBy: 'advertisements', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Dealer $dealer = null;

    #[ORM\ManyToOne(inversedBy: 'advertisements', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Shop $shop = null;



    #[ORM\ManyToOne(inversedBy: 'advertisements')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Site $site = null;


    #[ORM\ManyToOne(inversedBy: 'advertisements')]
    private ?Make $make = null;

    #[ORM\ManyToOne(inversedBy: 'advertisements')]
    private ?Model $model = null;

    #[ORM\ManyToOne(inversedBy: 'advertisements')]
    private ?Version $version = null;


    #[ORM\ManyToOne(inversedBy: 'advertisements')]
    private ?Finish $finish = null;

    /**
     * @var Collection<int, Image>
     */
    #[ORM\OneToMany(targetEntity: Image::class, mappedBy: 'advertisement', cascade: ['persist', 'remove'])]
    private Collection $images;

    #[ORM\OneToOne(inversedBy: 'advertisement', cascade: ['persist', 'remove'])]
    private ?Video $video = null;


    public function __construct()
    {
        $this->images = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMfid(): int
    {
        return $this->mfid;
    }

    public function setMfid(int $mfid): Advertisement
    {
        $this->mfid = $mfid;
        return $this;
    }

    public function getPublished(): string
    {
        return $this->published;
    }

    public function setPublished(string $published): Advertisement
    {
        $this->published = $published;
        return $this;
    }

    public function getAvailable(): string
    {
        return $this->available;
    }

    public function setAvailable(string $available): Advertisement
    {
        $this->available = $available;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Advertisement
    {
        $this->name = $name;
        return $this;
    }



    public function getVin(): string
    {
        return $this->vin;
    }

    public function setVin(string $vin): Advertisement
    {
        $this->vin = $vin;
        return $this;
    }

    public function getPlate(): string
    {
        return $this->plate;
    }

    public function setPlate(string $plate): Advertisement
    {
        $this->plate = $plate;
        return $this;
    }

    public function getRegistrationDate(): ?\DateTimeInterface
    {
        return $this->registrationDate;
    }

    public function setRegistrationDate(?\DateTimeInterface $registrationDate): Advertisement
    {
        $this->registrationDate = $registrationDate;
        return $this;
    }

    public function getLastRegistrationDate(): ?\DateTimeInterface
    {
        return $this->lastRegistrationDate;
    }

    public function setLastRegistrationDate(?\DateTimeInterface $lastRegistrationDate): Advertisement
    {
        $this->lastRegistrationDate = $lastRegistrationDate;
        return $this;
    }

    public function getManufacturingDate(): ?\DateTimeInterface
    {
        return $this->manufacturingDate;
    }

    public function setManufacturingDate(?\DateTimeInterface $manufacturingDate): Advertisement
    {
        $this->manufacturingDate = $manufacturingDate;
        return $this;
    }

    public function getPublicationDate(): ?\DateTimeInterface
    {
        return $this->publicationDate;
    }

    public function setPublicationDate(?\DateTimeInterface $publicationDate): Advertisement
    {
        $this->publicationDate = $publicationDate;
        return $this;
    }

    public function getModificationDate(): ?\DateTimeInterface
    {
        return $this->modificationDate;
    }

    public function setModificationDate(?\DateTimeInterface $modificationDate): Advertisement
    {
        $this->modificationDate = $modificationDate;
        return $this;
    }

    public function getLastUpdate(): ?\DateTimeInterface
    {
        return $this->lastUpdate;
    }

    public function setLastUpdate(?\DateTimeInterface $lastUpdate): Advertisement
    {
        $this->lastUpdate = $lastUpdate;
        return $this;
    }

    public function getDaysPublished(): int
    {
        return $this->daysPublished;
    }

    public function setDaysPublished(int $daysPublished): Advertisement
    {
        $this->daysPublished = $daysPublished;
        return $this;
    }

    public function getJato(): string
    {
        return $this->jato;
    }

    public function setJato(string $jato): Advertisement
    {
        $this->jato = $jato;
        return $this;
    }

    public function getTypnatcode(): string
    {
        return $this->typnatcode;
    }

    public function setTypnatcode(string $typnatcode): Advertisement
    {
        $this->typnatcode = $typnatcode;
        return $this;
    }

    public function getInternalRef(): string
    {
        return $this->internalRef;
    }

    public function setInternalRef(string $internalRef): Advertisement
    {
        $this->internalRef = $internalRef;
        return $this;
    }

    public function getOrigen(): ?string
    {
        return $this->origen;
    }

    public function setOrigen(?string $origen): Advertisement
    {
        $this->origen = $origen;
        return $this;
    }

    public function getDealer(): ?Dealer
    {
        return $this->dealer;
    }

    public function setDealer(?Dealer $dealer): Advertisement
    {
        $this->dealer = $dealer;
        return $this;
    }

    public function getShop(): ?Shop
    {
        return $this->shop;
    }

    public function setShop(?Shop $shop): Advertisement
    {
        $this->shop = $shop;
        return $this;
    }



    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): Advertisement
    {
        $this->status = $status;
        return $this;
    }

    public function getTypeVehicle(): string
    {
        return $this->typeVehicle;
    }

    public function setTypeVehicle(string $typeVehicle): Advertisement
    {
        $this->typeVehicle = $typeVehicle;
        return $this;
    }

    public function getBodyType(): string
    {
        return $this->bodyType;
    }

    public function setBodyType(string $bodyType): Advertisement
    {
        $this->bodyType = $bodyType;
        return $this;
    }

    public function getBodyTypeEs(): string
    {
        return $this->bodyTypeEs;
    }

    public function setBodyTypeEs(string $bodyTypeEs): Advertisement
    {
        $this->bodyTypeEs = $bodyTypeEs;
        return $this;
    }

    public function isIva(): bool
    {
        return $this->iva;
    }

    public function setIva(bool $iva): Advertisement
    {
        $this->iva = $iva;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price !== null ? (float)$this->price : null;
    }

    public function setPrice(float $price): Advertisement
    {
        $this->price = $price !== null ? (string)$price : null;
        return $this;
    }

    public function getFinancedPrice(): ?float
    {
        return $this->financedPrice !== null ? (float)$this->financedPrice : null;
    }

    public function setFinancedPrice(float $financedPrice): Advertisement
    {
        $this->financedPrice = $financedPrice !== null ? (string)$financedPrice : null;
        return $this;
    }

    public function getPurchasePrice(): ?float
    {
        return $this->purchasePrice !== null ? (float)$this->purchasePrice : null;
    }

    public function setPurchasePrice(float $purchasePrice): Advertisement
    {
        $this->purchasePrice = $purchasePrice !== null ? (string)$purchasePrice : null;
        return $this;
    }

    public function getPriceNew(): ?float
    {
        return $this->priceNew !== null ? (float)$this->priceNew : null;
    }

    public function setPriceNew(float $priceNew): Advertisement
    {
        $this->priceNew = $priceNew !== null ? (string)$priceNew : null;
        return $this;
    }

    public function getKm(): int
    {
        return $this->km;
    }

    public function setKm(int $km): Advertisement
    {
        $this->km = $km;
        return $this;
    }

    public function getCv(): string
    {
        return $this->cv;
    }

    public function setCv(string $cv): Advertisement
    {
        $this->cv = $cv;
        return $this;
    }

    public function getKw(): string
    {
        return $this->kw;
    }

    public function setKw(string $kw): Advertisement
    {
        $this->kw = $kw;
        return $this;
    }

    public function getCc(): int
    {
        return $this->cc;
    }

    public function setCc(int $cc): Advertisement
    {
        $this->cc = $cc;
        return $this;
    }

    public function getTiresFront(): string
    {
        return $this->tires_front;
    }

    public function setTiresFront(string $tires_front): Advertisement
    {
        $this->tires_front = $tires_front;
        return $this;
    }

    public function getTiresBack(): string
    {
        return $this->tires_back;
    }

    public function setTiresBack(string $tires_back): Advertisement
    {
        $this->tires_back = $tires_back;
        return $this;
    }

    public function getFuel(): string
    {
        return $this->fuel;
    }

    public function setFuel(string $fuel): Advertisement
    {
        $this->fuel = $fuel;
        return $this;
    }

    public function getColor(): string
    {
        return $this->color;
    }

    public function setColor(string $color): Advertisement
    {
        $this->color = $color;
        return $this;
    }

    public function isFreeAccidents(): bool
    {
        return $this->freeAccidents;
    }

    public function setFreeAccidents(bool $freeAccidents): Advertisement
    {
        $this->freeAccidents = $freeAccidents;
        return $this;
    }

    public function getTraction(): string
    {
        return $this->traction;
    }

    public function setTraction(string $traction): Advertisement
    {
        $this->traction = $traction;
        return $this;
    }

    public function getGearbox(): string
    {
        return $this->gearbox;
    }

    public function setGearbox(string $gearbox): Advertisement
    {
        $this->gearbox = $gearbox;
        return $this;
    }

    public function getNumberOfGears(): int
    {
        return $this->number_of_gears;
    }

    public function setNumberOfGears(int $number_of_gears): Advertisement
    {
        $this->number_of_gears = $number_of_gears;
        return $this;
    }

    public function getDoors(): int
    {
        return $this->doors;
    }

    public function setDoors(int $doors): Advertisement
    {
        $this->doors = $doors;
        return $this;
    }

    public function getSeats(): int
    {
        return $this->seats;
    }

    public function setSeats(int $seats): Advertisement
    {
        $this->seats = $seats;
        return $this;
    }

    public function getEnvironmentalBadge(): string
    {
        return $this->environmentalBadge;
    }

    public function setEnvironmentalBadge(string $environmentalBadge): Advertisement
    {
        $this->environmentalBadge = $environmentalBadge;
        return $this;
    }

    public function getWarrantyDuration(): int
    {
        return $this->warrantyDuration;
    }

    public function setWarrantyDuration(int $warrantyDuration): Advertisement
    {
        $this->warrantyDuration = $warrantyDuration;
        return $this;
    }

    public function getQuote(): ?string
    {
        return $this->quote;
    }

    public function setQuote(?string $quote): Advertisement
    {
        $this->quote = $quote;
        return $this;
    }

    public function getTextLegal(): ?string
    {
        return $this->textLegal;
    }

    public function setTextLegal(?string $textLegal): Advertisement
    {
        $this->textLegal = $textLegal;
        return $this;
    }





    /*public function __toString():string
    {
        return 'Anuncio: '.$this->mfid.' Marca: '.$this->make.' Modelo: '.$this->model.' Version: '.$this->version;
    }*/

    public function getSite(): Site
    {
        return $this->site;
    }

    public function setSite(Site $site): static
    {
        $this->site = $site;
        return $this;
    }

    public function getMake(): ?Make
    {
        return $this->make;
    }

    public function setMake(?Make $make): static
    {
        $this->make = $make;

        return $this;
    }

    public function getModel(): ?Model
    {
        return $this->model;
    }

    public function setModel(?Model $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getVersion(): ?Version
    {
        return $this->version;
    }

    public function setVersion(?Version $version): static
    {
        $this->version = $version;
        return $this;
    }


    public function getFinish(): Finish
    {
        return $this->finish;
    }

    public function setFinish(Finish $finish): Advertisement
    {
        $this->finish = $finish;
        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function setImages(array $images): static
    {
        $imagesList = $this->images;
        foreach ($imagesList as $img){
            $this->removeImage($img);
        }

        foreach ($images as $image){
            $this->addImage($image);
        }
        return $this;
    }


    public function addImage(Image $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setAdvertisement($this);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getAdvertisement() === $this) {
                $image->setAdvertisement(null);
            }
        }

        return $this;
    }

    public function getVideo(): ?Video
    {
        return $this->video;
    }

    public function setVideo(?Video $video): static
    {
        $this->video = $video;

        return $this;
    }



}
