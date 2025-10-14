import { AmountNotFound } from "@/Services/Error/amount-not-found";
import type { Conversion, Prisma } from "../../generated/prisma";
import type { conversionRepository } from "../prisma/convertionRepository";
import { ConvertionsNotFound } from "@/Services/Error/convertion-not-found";
import { randomUUID } from "node:crypto";

export class InMemoryConversionRepository implements conversionRepository{
    public items:Conversion[] = [];

    
    async createConversion(data: Prisma.ConversionCreateInput): Promise<Conversion> {
        const conversion: Conversion = {
            id: randomUUID(), 
            amount: data.amount,
            convertedAmount: data.convertedAmount,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
            userId: data.user.connect?.id ?? "",
            fromCurrencyId: data.fromCurrency.connect?.id ?? "",
            toCurrencyId: data.toCurrency.connect?.id ?? ""
        };
        this.items.push(conversion);
        return conversion;
    }

    async findConversionById(id: string){
        const conversion = this.items.find(item => item.id === id);
        
        return conversion ?? null;
    }

    async findConversionsByFromCurrencyById(id: string){
        const conversion = this.items.filter(item => item.fromCurrencyId === id);

        if(!conversion) throw new Error("Not found");

        return conversion ?? null;
    }

    async findConversionsByToCurrencyById(id: string){
        const conversions = this.items.filter(item => item.toCurrencyId === id)

        if(!conversions) throw new Error("Not Found");

        return conversions ?? null;
    }

    async amountConverted(amount: number){
        const conversions = this.items.find(item => item.amount === amount)

        if(!conversions) throw new AmountNotFound()

        return conversions ?? null;
    }

    async findConversionsByUser(userId: string){
        const conversions = this.items.filter(item => item.userId === userId);

        if(!conversions) throw new ConvertionsNotFound()

        return conversions ?? null;
    }

    async findConversionsByDateRange(startDate: Date, endDate: Date){
        const conversions = this.items.filter(item =>
            item.createdAt >= startDate && item.createdAt <= endDate
        );
        return conversions;
    }

    async findRecentConversions(limit?: number){
        const sorted = [...this.items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        if (limit !== undefined) {
            return sorted.slice(0, limit);
        }
        return sorted;
    }

    async deleteConversion(olderThan: Date): Promise<number> {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.createdAt >= olderThan);
        const deletedCount = initialLength - this.items.length;
        return deletedCount;
    }
    
}