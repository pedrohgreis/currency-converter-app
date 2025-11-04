import { CurrencyRepository } from "@/repositories/prisma/currencyRepository";
import { CurrencyUseCase } from "../useCases/currencyUseCases";

export function makeCreateCurrencyUseCase(){
    const repository = new CurrencyRepository()
    const useCase = new CurrencyUseCase(repository)

    return useCase;
}