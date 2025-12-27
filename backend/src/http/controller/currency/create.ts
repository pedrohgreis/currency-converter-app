import z from 'zod'
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateCurrencyUseCase } from '@/Services/factories/make-create-currency-use-case';
import { CouldNotCreateCurrency } from '@/Services/Error/could-not-create-currency';

export async function create(request: FastifyRequest, reply: FastifyReply){
    const createCurrencySchema = z.object({
        code: z.string().trim().regex(/^[A-Za-z]{3}$/, { message: 'Use ISO 4217 3-letter code' }).transform(s => s.toUpperCase()),
        name: z.string().trim().min(1).max(100),
        symbol: z.string().trim().min(1).max(5)
    }).strict()

    const parsed = createCurrencySchema.safeParse(request.body)

    if(!parsed.success){
        return reply.status(400).send({ errors: z.treeifyError(parsed.error)})
    }

    const {code,name,symbol} = parsed.data

    try{
        const createUseCase = makeCreateCurrencyUseCase()

        const {currency} = await createUseCase.execute({
            name,
            code,
            symbol
        })

        return reply.status(201).send({ currency })

    } catch(error){
        if(error instanceof CouldNotCreateCurrency){
            return reply.status(409).send({message: error.message})
        }

        throw error
    }

}