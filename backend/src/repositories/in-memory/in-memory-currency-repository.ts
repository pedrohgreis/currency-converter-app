import type { Currency, Prisma } from "../../generated/prisma";
import type { CurrencyRepository } from "../prisma/currencyRepository";
import { UserNotFound } from "../../Services/Error/user-not-foud";
import { CurrencyNotFound } from "../../Services/Error/currency-not-found";


export class InMemoryCurrencyRepository implements CurrencyRepository {
    public items: Currency[] = [];

    async createCurrency(data: Prisma.CurrencyCreateInput) {
        const currency: Currency = {
            id: `currency-${this.items.length + 1}`,
            name: data.name,
            code: data.code,
            symbol: data.symbol ?? null
        };
        this.items.push(currency);
        return currency;
    }

    async findCurrencyById(id: string) {
        const currency = this.items.find(item => item.id === id);
        return currency ?? null;
    }

    async findCurrencyByCode(code: string) {
        const currency = this.items.find(item => item.code === code);
        return currency ?? null;
    }

    async findCurrencyByName(name: string) {
        const currency = this.items.find(item => item.name === name);
        return currency ?? null;
    }

    async findCurrencySymbol(symbol: string) {
        const currency = this.items.find(item => item.symbol === symbol);
        return currency ?? null;
    }

    async findCurrencyBySymbol(symbol: string): Promise<Currency | null> {
        const currency = this.items.find(item => item.symbol === symbol);
        return currency ?? null;
    }

    async updateCurrency(id: string, data: Partial<Currency>) {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) throw new UserNotFound();
        if (!this.items[index]) {
            throw new Error("Currency not found for update");
        }
        Object.assign(this.items[index], data);
        return this.items[index];
    }

    async deleteCurrency(id: string) {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) throw new CurrencyNotFound();
        const [deletedCurrency] = this.items.splice(index, 1);
        if (!deletedCurrency) throw new Error("User not found after splice");
        return deletedCurrency;
    }

    async listCurrencies() {
        return this.items;
    }
}
