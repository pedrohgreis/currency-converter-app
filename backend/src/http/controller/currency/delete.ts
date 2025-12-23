import { CurrencyNotFound } from "@/Services/Error/currency-not-found";
import { makeDeleteCurrencyUseCase } from "@/Services/factories/make-delete-currency-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function DeleteCurrency(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){

    const deleteCurrencySchema = z.object({
        id: z.string()
    })

    const parsed = deleteCurrencySchema.safeParse(request.params)

    if(!parsed.success){
        return reply.status(400).send({errors: z.treeifyError(parsed.error)})
    }

    try{

        const useCase = makeDeleteCurrencyUseCase()

        await useCase.delete({
            currencyId: parsed.data.id
        })

        return reply.status(200).send({message: "Currency deleted"})

    } catch(error){
        if(error instanceof CurrencyNotFound){
            return reply.status(404).send({message: (error as CurrencyNotFound).message})
        }

        throw error;
    }
}