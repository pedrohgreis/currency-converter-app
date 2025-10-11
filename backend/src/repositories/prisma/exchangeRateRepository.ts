import type { Prisma, ExchangeRate } from "@/generated/prisma";
import type { ExchangeRateInterface } from "../interfaces/exchangeRateInterface";
import { prisma } from "../../lib/prisma";

export class exchangeRateRepository implements ExchangeRateInterface{
    async saveRate(data: Prisma.ExchangeRateCreateInput){
        const rate = await prisma.exchangeRate.create({
            data,
        })

        return rate;
    }


    async fetchRate(base: string, target: string){
        const rate = await prisma.exchangeRate.findFirst({
            where: {
                fromCurrencyId: base,
                toCurrencyId: target
            }
        })

        return rate;
    }

    async fetchAllRateByBase(base: string){
        const rate = await prisma.exchangeRate.findMany({
            where:{
                fromCurrencyId: base
            }
        })

        return rate;
    }

    async isRateFresh(base: string, target: string){
        const rate = await prisma.exchangeRate.findFirst({
            where: {
                fromCurrencyId: base,
                toCurrencyId: target
            }
        })

        if(!rate) return false;

        // obtaining current date
        const now = new Date();

        //Calculate diff in miliseconds
        const diffMs = now.getTime() - rate.updatedAt.getTime();

         //Convert to hours
        const diffHours = diffMs / (1000 * 60 * 60);

         //Define limit
        const isFresh = diffHours < 1;


        return isFresh;
    }
}