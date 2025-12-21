import { exchangeRateRepository } from "@/repositories/prisma/exchangeRateRepository";
import { ExchangeRateUseCase } from "../useCases/exchangeRateUseCase";

export function makeExchenageRate(){
    const repository =  new exchangeRateRepository()
    const useCase = new ExchangeRateUseCase(repository)

    return useCase;
}