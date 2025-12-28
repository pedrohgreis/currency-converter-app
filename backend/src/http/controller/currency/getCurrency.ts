import { CurrencyRepository } from "@/repositories/prisma/currencyRepository";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function GetAllCurrencies(request: FastifyRequest, reply: FastifyReply){
    try{
        const currencyRepository = new CurrencyRepository()

        const currencies = await currencyRepository.listCurrencies()

        return reply.status(200).send({currencies})
    } catch(error){
        return reply.status(500).send({message: "Internal error"})
    }
}





type CurrencyId = {
    id: string
}

export async function GetCurrencyById(request: FastifyRequest<{Params: CurrencyId}>, reply: FastifyReply){
    
    const getCurrencyIdSchema = z.object({
        id: z.string()
    })

    const parsed = getCurrencyIdSchema.safeParse(request.params)

    if(!parsed.success){
        return reply.status(500).send({errors: z.treeifyError(parsed.error)})
    }

    try{
        const currencyRepository = new CurrencyRepository()
        const currencies = await currencyRepository.findCurrencyById(parsed.data?.id)

        return reply.status(200).send({currencies})
    } catch(error){
         return reply.status(500).send({message: "Internal error"})
    }
}
