import type { ExchangeRate, Prisma } from "../../generated/prisma";
import type { exchangeRateRepository } from "../prisma/exchangeRateRepository";
import { InvalidRate } from "../../Services/Error/invalid-rate";



export class InMemoryExchangeRateRepository implements exchangeRateRepository{
    public items: ExchangeRate[] = [];

    async saveRate(data: Prisma.ExchangeRateCreateInput) {
        const rate: ExchangeRate = {
            id: 'rate-1',
            fromCurrencyId: data.fromCurrency.connect?.id ?? "",
            toCurrencyId: data.toCurrency.connect?.id ?? "",
            rate: data.rate,
            updatedAt: new Date()
        };
        
        this.items.push(rate);
        return rate;
    }

    async fetchRate(base: string, target: string){
        const rate = this.items.find(item => item.fromCurrencyId === base && item.toCurrencyId === target);
        
        return rate ?? null;
    }

    async fetchAllRateByBase(base: string){
        const rates = this.items.filter(item => item.fromCurrencyId === base);

        return rates;
    }

    async isRateFresh(base: string, target: string): Promise<boolean> {
        const rate = this.items.find(item => item.fromCurrencyId === base && item.toCurrencyId === target);
        if (!rate) throw new InvalidRate();
        
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return rate.updatedAt > oneHourAgo;
    }
    
}