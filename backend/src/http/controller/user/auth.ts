import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticationUseCase } from '@/Services/factories/make-authentication-use-case'
import { InvalidCredentialsError } from '@/Services/Error/invalid-credential-error'

export async function Authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().trim().transform((s) => s.toLowerCase()),
        password: z.string().min(6)
    })

   const parsed = authenticateBodySchema.safeParse(request.body);

    if (!parsed.success) {
        return reply.status(400).send({ errors: parsed.error });
    }

    const { email, password } = parsed.data;


    try{
        const authenticateUseCase = makeAuthenticationUseCase()

        const {user} = await authenticateUseCase.execute({
            email,
            password
        })
        
        const isProduction = process.env.NODE_ENV === 'production'


        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign:{
                sub: user.id,
                expiresIn: "2h"
            }
        })

        return reply.status(200)
        .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            httpOnly: true,
        })
        .send({
            token,
        })


    } catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({
                message: err.message
            })
        }

        throw err;
    }
}