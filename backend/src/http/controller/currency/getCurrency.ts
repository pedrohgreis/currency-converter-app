import { CurrencyRepository } from "@/repositories/prisma/currencyRepository";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function GetAllCurrencies(request: FastifyRequest, reply: FastifyReply){
    try{
        const currencyRepository = new CurrencyRepository()

        const currencies = await currencyRepository.listCurrencies()

        return reply.status(200).send({currencies})
    } catch(error){
        return reply.status(500).send({message: "Internal error"})
    }
}