import type { ConversionRepository } from "@/repositories/prisma/convertionRepository"
import { ConvertionNotDeleted } from "../Error/currency-not-deletd"
import type { Conversion } from "@/generated/prisma"

interface ConvertionDletedByDayRequest{
    days: number,
}

interface ConvertionDletedByIdRequest{
    convertionId: string
}

interface ConvertionResponse{
    deletedConvertion?: number
    deletedConvertionById?: Conversion
}


export class DeleteConvertionUseCase{
    constructor(private readonly convertionRepository: ConversionRepository){}

    async deleteDays({days = 14}: ConvertionDletedByDayRequest): Promise<ConvertionResponse>{
        const date = new Date()
        date.setDate(date.getDate() - days)

        const deletedConvertion = await this.convertionRepository.deleteConversion(date)

        if(deletedConvertion === 0) throw new ConvertionNotDeleted()

        return {deletedConvertion}
    }
    
    async deletedById({convertionId}: ConvertionDletedByIdRequest): Promise<ConvertionResponse>{
        const deletedConvertionById = await this.convertionRepository.deleteConvertionById(convertionId)
    
        if(!deletedConvertionById) throw new ConvertionNotDeleted()
    
        return {deletedConvertionById}
    }
}