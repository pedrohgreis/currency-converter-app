import { makeGetUserProfileUseCase } from "@/Services/factories/make-get-profile-use-case"
import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"

export async function Profile(request: FastifyRequest, reply: FastifyReply){
    const profileBodySchema = z.object({
        userId: z.string()
    })

    const parsed = profileBodySchema.safeParse(request.body)

    if(!parsed.success){
        return reply.status(400).send({ errors: z.treeifyError(parsed.error) })
    }

    const {userId} = parsed.data

    try{
        const useCase = makeGetUserProfileUseCase()

        const {user} = await useCase.execute({
            userId
        })

        return reply.status(200).send({user})

    } catch(error){
        return reply.status(500).send({error: "Invalid error"})
    }
}