<?php
namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Site;


class DF03_SitesFixtures extends Fixture implements OrderedFixtureInterface
{
    public function getOrder():int
    {
        return 3;
    }

    public function load(ObjectManager $manager): void
    {
        $sites = [
            [
                'name'=>'DaswelAuto',
                'url'=>'www.daswellauto.es',
                'mfSiteId'=>67,
                'apicoreClientId'=>'user@apicore.local',
                'apicoreClientSecret'=>'456',
                'active'=>true
            ]
        ];

        foreach ($sites as $site) {
            $newSite = new Site();
            $newSite->setName($site['name'])
                ->setUrl($site['url'])
                ->setMfSiteId($site['mfSiteId'])
                ->setApicoreClientId($site['apicoreClientId'])
                ->setApicoreClientSecret($site['apicoreClientSecret'])
                ->setActive($site['active']);

            $manager->persist($newSite);
        }

        $manager->flush();
    }
}
