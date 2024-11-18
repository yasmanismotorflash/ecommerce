<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity]
#[ORM\Table(name: 'makes', options: ["comment" => "Tabla para almacenar las marcas de los anuncios"])]
#[ApiResource]
class Make
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', name: 'name',length: 120, options: ["comment" => "Campo nombre visible de la marca"])]
    private string $name;

    #[ORM\OneToMany(targetEntity: Model::class, mappedBy: 'make')]
    private Collection $models;

    #[ORM\ManyToOne(inversedBy: 'makes')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Site $site = null;

    /**
     * @var Collection<int, Advertisement>
     */
    #[ORM\OneToMany(targetEntity: Advertisement::class, mappedBy: 'make')]
    private Collection $advertisements;




    public function __construct()
    {
        $this->models = new ArrayCollection();
        $this->advertisements = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId():int
    {
        return $this->id;
    }


    /**
     * @return string
     */
    public function getName():string
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return Make
     */
    public function setName(string $name):string
    {
        $this->name = $name;
        return $this;
    }

    public function getModels(): Collection
    {
        return $this->models;
    }

    public function setModels(Collection $models): Make
    {
        $this->models = $models;
        return $this;
    }

    public function __toString():string
    {
        return $this->name;
    }

    public function getSite(): Site
    {
        return $this->site;
    }

    public function setSite(Site $site): static
    {
        $this->site = $site;
        return $this;
    }

    /**
     * @return Collection<int, Advertisement>
     */
    public function getAdvertisements(): Collection
    {
        return $this->advertisements;
    }

    public function addAdvertisement(Advertisement $advertisement): static
    {
        if (!$this->advertisements->contains($advertisement)) {
            $this->advertisements->add($advertisement);
            $advertisement->setMake($this);
        }

        return $this;
    }

    public function removeAdvertisement(Advertisement $advertisement): static
    {
        if ($this->advertisements->removeElement($advertisement)) {
            // set the owning side to null (unless already changed)
            if ($advertisement->getMake() === $this) {
                $advertisement->setMake(null);
            }
        }

        return $this;
    }


}