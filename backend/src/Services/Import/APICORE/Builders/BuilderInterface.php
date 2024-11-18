<?php
namespace App\Services\Import\APICORE\Builders;

use Doctrine\ORM\EntityManagerInterface;

interface BuilderInterface
{
    static function validateArray(array $data): bool;

    static function buildFromJson(string $json): ?object;

    static function buildFromArray(EntityManagerInterface $em, array $data): ?object;

}