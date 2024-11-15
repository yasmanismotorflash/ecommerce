import { IPagination } from '@/interface'
import { SVGProps } from 'react'

// TODO: Revisar orden de asociados en footer ( LOGOS )
// ¿ Vienen o vendrán de base de datos ?

export enum Asocciates {
  Tesla = 'Tesla',
  Okmobilit = 'Okmobility',
  Mundimoto = 'Mundimoto',
  Movento = 'Movento',
  Automotion = 'Automotion',
  Carplus = 'Carplus',
}

export enum CarStatusEnum {
  DISPONIBLE = 'DISPONIBLE',
  RESERVADO = 'RESERVADO',
  VENDIDO = 'VENDIDO',
}

export enum CarFuelEnum {
  Diésel = 'Diésel',
  Gasolina = 'Gasolina',
}

export enum EnvironmentalEnum {
  C = 'C',
  B = 'B',
  ECO = 'ECO',
  '0_emisiones' = '0_emisiones',
}
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
  color?: string
  stroke?: string
  className?: string
}

export interface ICarList extends IPagination {
  advertisements: ICar[]
}

export interface ICar {
  id: string
  make: string
  km: number
  version: string
  model: string
  fuel: CarFuelEnum
  available: CarStatusEnum
  price: number
  statusBooking: CarStatusEnum
  images: string[]
  gearbox: string
  registrationDate: string
  environmentalBadge: EnvironmentalEnum
  dealer: IDealer
}
export interface IDealer {
  id: string
  province: string
  cp: string
  city: string
}

export enum SiteStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum UserRoles {
  CAIXA = "CAIXA",
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  DEALER = "DEALER",
  SHOP = "SHOP",
  USER = "USER"
}

export type Role = {
  id: number;
  value: string;
  label: string;
};