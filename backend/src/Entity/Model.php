<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity]
#[ORM\Table(name: 'models', options: ["comment" => "Tabla para almacenar los modelos de los anuncios"])]
#[ApiResource]
class Model
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', name: 'name',length: 120, options: ["comment" => "Campo nombre visible del modelo"])]
    private string $name;

    #[ORM\ManyToOne(targetEntity: Make::class, inversedBy: 'models')]
    private Make $make;


    /**
     * @var Collection<int, Model>
     */
    #[ORM\OneToMany(targetEntity: Version::class, mappedBy: 'model')]
    private Collection $versions;

    /**
     * @var Collection<int, Advertisement>
     */
    #[ORM\OneToMany(targetEntity: Advertisement::class, mappedBy: 'model')]
    private Collection $advertisements;

    #[ORM\ManyToOne(inversedBy: 'models')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Site $site = null;


    public function __construct()
    {
        $this->versions = new ArrayCollection();
        $this->advertisements = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }



    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return Model
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return Make
     */
    public function getMake(): Make
    {
        return $this->make;
    }

    /**
     * @param mixed $make
     * @return Model
     */
    public function setMake($make)
    {
        $this->make = $make;
        return $this;
    }

    public function getVersions(): Collection
    {
        return $this->versions;
    }

    public function setVersions(Collection $versions): Model
    {
        $this->versions = $versions;
        return $this;
    }

    public function __toString():string
    {
        return $this->name;
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
            $advertisement->setModel($this);
        }

        return $this;
    }

    public function removeAdvertisement(Advertisement $advertisement): static
    {
        if ($this->advertisements->removeElement($advertisement)) {
            // set the owning side to null (unless already changed)
            if ($advertisement->getModel() === $this) {
                $advertisement->setModel(null);
            }
        }

        return $this;
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



}