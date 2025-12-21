import type { Currency } from "@/generated/prisma";
import type { CurrencyRepository } from "@/repositories/prisma/currencyRepository";
import { CurrencyNotDeleted } from "../Error/currency-not-deleted";

interface GetUserProfileUseCaseRequest{
    currencyId: string;
}
 
interface GetUserProfileUseCaseResponse{
    currency: Currency,
}

export class DeleteCurrencyUseCase{
    constructor(private readonly currencyRepository: CurrencyRepository){}

    async delete({currencyId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        const currency = await this.currencyRepository.deleteCurrency(currencyId)

        if(!currency) throw new CurrencyNotDeleted() 

        return {currency}
    }
}