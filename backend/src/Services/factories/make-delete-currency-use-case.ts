import { CurrencyRepository } from "@/repositories/prisma/currencyRepository";
import { DeleteCurrencyUseCase } from "../useCases/deleteCurrencyUseCase";

export function makeDeleteCurrencyUseCase(){
    const repository = new CurrencyRepository()
    const useCase = new DeleteCurrencyUseCase(repository)

    return useCase;
}