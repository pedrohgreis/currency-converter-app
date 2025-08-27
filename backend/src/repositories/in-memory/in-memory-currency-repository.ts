import type { Currency, Prisma } from "@/generated/prisma";
import type { CurrencyRepository } from "../prisma/currencyRepository";
import { UserNotFound } from "@/Services/Errors/user-not-foud";
import { email } from "zod";

export class InMemoryCurrencyRepository implements CurrencyRepository{
    public items:Currency[] = [];

    async createCurrency(data: Prisma.CurrencyCreateInput) {
        const currency = {
            id: "currency-1",
            name: data.name,
            code: data.code,
            symbol: data.symbol ?? null
        }

        this.items.push(currency); 
        return currency;
    }

    async findCurrencyById(id: string){
        const currency = this.items.find(item => item.id === id);

        return currency ?? null;
    }

    async findCurrencyByCode(code: string) {
        const currency = this.items.find(item => item.code === code);

        return currency ?? null;
    }

    async updateCurrency(id: string, data: Partial<Currency>) {
        const index = this.items.findIndex(item => item.id === id);

        if(index === -1) throw new UserNotFound();

        Object.assign(this.items[index]!, data);

        // Ensure we never return undefined
        if (!this.items[index]) {
            throw new Error("Currency not found after update");
        }

        return this.items[index];
    }

    async deleteCurrency(id: string) {
        const index = this.items.findIndex(item => item.id === id);

        if(index === -1) throw new UserNotFound();

        const [deletedCurrency] = this.items.splice(index, 1);

        if(!deletedCurrency) throw new Error("User not found after splice");

        return deletedCurrency;
    }

    async listCurrencies() {
        return this.items;
    }
    
}