import type { Currency } from "@/generated/prisma";
import type { CurrencyRepository } from "@/repositories/prisma/currencyRepository";
import { CurrencyNotFound } from "../Error/currency-not-found";
import { CurrencyNotDeleted } from "../Error/currency-not-deleted";

interface GetCurrencyUseCaseRequest{
    currencyId: string;
}
 
interface GetCurrencyUseCaseResponse{
    currency: Currency,
}

export class DeleteCurrencyUseCase{
    constructor(private readonly currencyRepository: CurrencyRepository){}

    async delete({currencyId}: GetCurrencyUseCaseRequest): Promise<GetCurrencyUseCaseResponse>{
        const currency = await this.currencyRepository.deleteCurrency(currencyId)

        if(!currency) throw new CurrencyNotDeleted() 

        return {currency}
    }
}