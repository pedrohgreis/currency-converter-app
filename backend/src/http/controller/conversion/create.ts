import z, { uuid } from 'zod'
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeConversionUseCase } from '@/Services/factories/make-conversion-use-case';
import { CouldNotCreateConversion } from '@/Services/Error/could-not-create-conversion';


export async function create(request: FastifyRequest, reply: FastifyReply){
    const conversionBodySchema = z.object({
        amount: z.coerce.number().positive(),
        fromCurrencyId: z.string().pipe(uuid()),
        toCurrencyId: z.string().pipe(uuid()),
        createdAt: z.string().optional()
        .transform(s => s ? new Date(s) : new Date())
        .refine(d => !Number.isNaN(d.getTime()), { message: 'Invalid date' })
    })

    const userId = request.user.sub;

    const parsed = conversionBodySchema.safeParse(request.body)

    if(!parsed.success){
        return reply.status(400).send({errors: z.treeifyError(parsed.error)})
    }

    const {amount, fromCurrencyId, toCurrencyId, createdAt} = parsed.data;

    if(amount <= 0){
        return reply.status(400).send({error: "Amount must be greater than 0"})
    }

    try{
        const useCase = makeConversionUseCase()
        
        const { conversion } = await useCase.execute({
            amount,
            fromCurrencyId,
            toCurrencyId,
            createdAt,
            convertedAmount: 0,
            userId
        })

        return reply.status(201).send({ conversion })
    } catch(error){
        if(error instanceof CouldNotCreateConversion){
            return reply.status(409).send({message: error.message})
        }

        throw error
    }

}