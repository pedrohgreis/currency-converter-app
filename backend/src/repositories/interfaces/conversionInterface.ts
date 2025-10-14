import {Prisma, type Conversion} from '@/generated/prisma'

export interface ConversionInterface{
    createConversion(data:Prisma.ConversionCreateInput): Promise<Conversion>
    findConversionById(id:string):Promise<Conversion | null>
    findConversionsByFromCurrencyById(id:string):Promise<Conversion[]>
    findConversionsByToCurrencyById(id:string):Promise<Conversion[]>

    amountConverted(amount: number):Promise<Conversion | null>

    
    findConversionsByUser(userId: string): Promise<Conversion[]>

    
    findConversionsByDateRange(startDate: Date, endDate: Date): Promise<Conversion[]>

 
    findRecentConversions(limit?: number): Promise<Conversion[]>

    deleteConversion(olderThan: Date): Promise<number>
}