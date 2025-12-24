import type { Prisma, Conversion } from "@/generated/prisma";
import type { ConversionInterface } from "../interfaces/conversionInterface";
import { prisma } from "../../lib/prisma";

export class ConversionRepository implements ConversionInterface{
    async createConversion(data: Prisma.ConversionCreateInput){
        const conversion = await prisma.conversion.create({
            data,
        })

        return conversion;
    }

    async findConversionById(id: string){
        const conversion = await prisma.conversion.findFirst({
            where:{
                id,
            }
        })

        return conversion;
    }

    async findConversionsByFromCurrencyById(id: string){
        const conversion = await prisma.conversion.findMany({
            where:{
                id,
            }
        })

        return conversion;
    }

    async findConversionsByToCurrencyById(id: string){
        const conversion = await prisma.conversion.findMany({
            where:{
                id,
            }
        })

        return conversion;
    }

    async amountConverted(amount: number) {
        const conversion = await prisma.conversion.findFirst({
            where: {
                amount,
            },
        });

        return conversion;
    }

    async findConversionsByUser(userId: string){
        const conversion = await prisma.conversion.findMany({
            where:{
                userId
            }
        })

        return conversion;
    }

    async findConversionsByDateRange(startDate: Date, endDate: Date){
        const conversion = await prisma.conversion.findMany({
            where:{
                createdAt:{
                    gte: startDate,
                    lte: endDate
                }
            }
        })

        return conversion;
    }

    async findRecentConversions(limit?: number){
        const query: any = {
            orderBy: {
                createdAt: "desc"
            }
        };
        if (typeof limit === "number") {
            query.take = limit;
        }
        const conversion = await prisma.conversion.findMany(query);

        return conversion;
    }

    async deleteConversion(olderThan: Date){
        const result = await prisma.conversion.deleteMany({
            where: {
                createdAt: {
                    lt: olderThan,
                },
            },
        });

        return result.count;
    }

    async deleteConvertionById(id: string){
        const convertion = await prisma.conversion.delete({
            where:{
                id
            }
        })

        return convertion;
    }
    
}