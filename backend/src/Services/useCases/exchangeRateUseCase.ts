import type { InMemoryExchangeRateRepository } from "@/repositories/in-memory/in-memory-exchangeRate";
import { InvalidRate } from "../Error/invalid-rate";
import { FutereDateError } from "../Error/futureDateError";
import { EmptyCurrencyError } from "../Error/EmptyCurrencyError";


export class ExchangeRateUseCase{
    constructor(private exchangeRateRepository: InMemoryExchangeRateRepository){}

    async execute(data: {fromCurrencyId: string, toCurrencyId: string, rate: number, updatedAt: Date}){
        const currencyFrom = data.fromCurrencyId
        const currencyTo = data.toCurrencyId


        if(currencyFrom === "" || currencyTo === ""){
            throw new EmptyCurrencyError()
        }

        // rate needs to be > 0
        const rate = data.rate
        if(rate <= 0){
            throw new InvalidRate()
        }

        if(data.updatedAt > new Date()) {
            throw new FutereDateError()
        }


        const exchangeRateData = {
            fromCurrency: { connect: { id: data.fromCurrencyId } },
            toCurrency: { connect: { id: data.toCurrencyId } },
            rate: data.rate
        }

        // Save to repository
        const savedRate = await this.exchangeRateRepository.saveRate(exchangeRateData);
        return savedRate;
    }
}