import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.ready

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie:{
        cookieName: "refreshToken",
        signed: false
    },
    sign:{
        expiresIn: "2h"
    }
})

app.register(fastifyCookie)


// toDo: need to finish with the routes and validation error