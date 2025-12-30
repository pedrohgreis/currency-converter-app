import { ConversionUseCase } from "../useCases/convertionUseCase";
import { ConversionRepository } from "@/repositories/prisma/convertionRepository";
import { exchangeRateRepository } from "@/repositories/prisma/exchangeRateRepository";

export function makeConversionUseCase(){
    const repository = new ConversionRepository()
    const rateRepository = new exchangeRateRepository()
    const useCase = new ConversionUseCase(repository, rateRepository)

    return useCase;
}