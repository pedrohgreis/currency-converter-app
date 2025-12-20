import { makeGetUserProfileUseCase } from "@/Services/factories/make-get-profile-use-case"
import type { FastifyRequest, FastifyReply } from "fastify"


export async function Profile(request: FastifyRequest, reply: FastifyReply){
     try {
    const userId = request.user?.sub

    if(!userId){
        return reply.status(401).send({message: "Unauthorized"})
    }

    const useCase = makeGetUserProfileUseCase()

    const { user } = await useCase.execute({
      userId,
    })

    return reply.status(200).send({ user })
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' })
  }
}