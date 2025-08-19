import {Prisma, type Currency} from '@/generated/prisma'

export interface CurrencyInterface{
    createCurrency(data: Prisma.CurrencyCreateInput): Promise<Currency>
    findCurrencyById(id:string): Promise<Currency | null>
    findCurrencyByCode(code:string): Promise<Currency | null>

    updateCurrency(id: string, data: Partial<Currency>): Promise<Currency>

    deleteCurrency(id: string): Promise<Currency>

    listCurrencies(): Promise<Currency[]>


}