import { ConversionRepository } from "@/repositories/prisma/convertionRepository";
import { DeleteConvertionUseCase } from "../useCases/deleteConvertionUseCase";

export function MakeDeleteConvertionUseCase(){
    const repository = new ConversionRepository()
    const userCase = new DeleteConvertionUseCase(repository)

    return userCase
}