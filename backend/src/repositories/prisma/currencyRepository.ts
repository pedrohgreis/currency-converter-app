import type { Prisma, Currency } from "@/generated/prisma";
import type { CurrencyInterface } from "../interfaces/currencyInterface";
import { prisma } from "../../lib/prisma";

export class CurrencyRepository implements CurrencyInterface {
    async findCurrencyByName(name: string) {
        return await prisma.currency.findFirst({
            where: { name }
        });
    }

    async findCurrencyBySymbol(symbol: string) {
        return await prisma.currency.findFirst({
            where: { symbol }
        });
    }

    async createCurrency(data: Prisma.CurrencyCreateInput) {
        const currency = await prisma.currency.create({
            data,
        });

        return currency;
    }

    async findCurrencyById(id: string) {
        const currency = await prisma.currency.findUnique({
            where: { id }
        });

        return currency;
    }

    async findCurrencyByCode(code: string) {
        const currency = await prisma.currency.findFirst({
            where: { code }
        });

        return currency;
    }

    async updateCurrency(id: string, data: Partial<Currency>) {
        const currency = await prisma.currency.update({
            where: { id },
            data,
        });

        return currency;
    }

    async deleteCurrency(id: string) {
        const currency = await prisma.currency.delete({
            where: { id }
        });

        return currency;
    }

    async listCurrencies() {
        const currency = await prisma.currency.findMany();

        return currency;
    }
}