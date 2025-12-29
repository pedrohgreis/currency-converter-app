import { ConvertionNotDeleted } from "@/Services/Error/convertion-not-deleted";
import { MakeDeleteConvertionUseCase } from "@/Services/factories/make-delete-convertion-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function DeleteConvertionById(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){

    const deleteConvertionSchema = z.object({
        id: z.string()
    })

    const parsed = deleteConvertionSchema.safeParse(request.params)

    if(!parsed.success){
        return reply.status(500).send({errors: z.treeifyError(parsed.error)})
    }

    try{

        const useCase = MakeDeleteConvertionUseCase()

        await useCase.deletedById({
            convertionId: parsed.data.id
        })

        return reply.status(200).send({message: "Convertion deleted"})

    }catch(error){
        if(error instanceof ConvertionNotDeleted){
            return reply.status(404).send({message: error.message})
        }

        throw error
    }
}

export async function DeleteConvertionByDate(request: FastifyRequest<{ Querystring: { days: string } }>, reply: FastifyReply){
    const deleteConvertionSchema = z.object({
        days: z.string().transform(Number).pipe(z.number().positive())
    })

    const parsed = deleteConvertionSchema.safeParse(request.query)

    if(!parsed.success){
        return reply.status(500).send({errors: z.treeifyError(parsed.error)})
    }

    try{
        const useCase = MakeDeleteConvertionUseCase()
        
         
        const deletedCount = await useCase.deleteDays({ days: parsed.data.days })

        return reply.status(200).send({message: `${deletedCount} conversions deleted`})

    } catch(error){
        if(error instanceof ConvertionNotDeleted){
            return reply.status(404).send({message: error.message})
        }

        throw error
    }
}