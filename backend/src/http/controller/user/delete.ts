import { UserNotFound } from "@/Services/Error/user-not-foud";
import { makeDeleteUserUseCase } from "@/Services/factories/make-delete-user-use-case";
import type { FastifyRequest, FastifyReply } from "fastify";

export async function Delete(request: FastifyRequest, reply: FastifyReply){
    try{

        const userId = request.user?.sub

        if(!userId){
             return reply.status(401).send({ message: "Unauthorized" });
        }

        const useCase = makeDeleteUserUseCase()

        await useCase.delete({
            userId,
        })

        return reply.status(204).send({message: "User deleted"})

    } catch(error){
        if(error instanceof UserNotFound){
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}