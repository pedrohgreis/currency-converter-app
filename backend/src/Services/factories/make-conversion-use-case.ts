import { ConversionUseCase } from "../useCases/convertionUseCase";
import { ConversionRepository } from "@/repositories/prisma/convertionRepository";

export function makeConversionUseCase(){
    const repository = new ConversionRepository()
    const useCase = new ConversionUseCase(repository)

    return useCase;
}