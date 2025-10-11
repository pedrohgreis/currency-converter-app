import {Prisma, type ExchangeRate} from '@/generated/prisma'

export interface ExchangeRateInterface{
    saveRate(data: Prisma.ExchangeRateCreateInput): Promise<ExchangeRate>;
    fetchRate(base: string, target: string): Promise<ExchangeRate | null>;
    fetchAllRateByBase(base:string): Promise<ExchangeRate[] | null>;
    isRateFresh(base: string, target: string):Promise<boolean>
}