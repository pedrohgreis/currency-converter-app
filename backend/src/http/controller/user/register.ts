import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlreadyExist } from '@/Services/Error/user-already-exists'

export async function Register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string().trim(),
        email: z.string().trim().transform(s => s.toLowerCase()),
        password: z.string().min(6)
    })


    const {name, email, password} = registerBodySchema.parse(request.body)

    try{

    } catch(err){
        if(err instanceof UserAlreadyExist){
            return reply.status(409).send({
                message: err.message
            })
        }

        throw err;
    }

    return reply.status(201).send()
}