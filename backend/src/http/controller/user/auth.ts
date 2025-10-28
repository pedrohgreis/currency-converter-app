import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticationUseCase } from '@/Services/factories/make-authentication-use-case'

export async function Authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().trim().transform((s) => s.toLowerCase()),
        password: z.string().min(6)
    })

    const {email, password} = authenticateBodySchema.parse(request.body)


    try{
        const authenticateUseCase = makeAuthenticationUseCase()

        const {user} = await authenticateUseCase.execute({
            email,
            password
        })



    } catch(err){}
}