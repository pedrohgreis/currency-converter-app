import type { FastifyRequest, FastifyReply } from "fastify"

export async function refresh(request: FastifyRequest, reply: FastifyReply){

    try{
        await request.jwtVerify({onlyCookie: true})

        const user = request.user;

        const token = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub,
            }
        })


        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub,
                expiresIn: "7d"
            }
        })

        return reply.status(201)
        .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .send({
            token,
        })
    } catch(err){
        return reply.status(401).send({message: "Unauthorized"});
    }
}