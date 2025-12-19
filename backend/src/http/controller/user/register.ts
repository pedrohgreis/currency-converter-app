import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlreadyExist } from '@/Services/Error/user-already-exists'
import { makeRegisterUseCase } from '@/Services/factories/make-register-use-case'

export async function Register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string().trim(),
        email: z.string().trim().transform(s => s.toLowerCase()),
        password: z.string().min(6)
    })


    const parsed = registerBodySchema.safeParse(request.body)
    
    if(!parsed.success){
        return reply.status(400).send({ errors: z.treeifyError(parsed.error) })
    }

    const {name, email, password} = parsed.data

    try{

        const useCase = makeRegisterUseCase()

        const {user} = await useCase.register({
            name,
            email,
            password
        })

        return reply.status(201).send({user})

    } catch(err){
        if(err instanceof UserAlreadyExist){
            return reply.status(409).send({
                message: err.message
            })
        }

        throw err;
    }
}