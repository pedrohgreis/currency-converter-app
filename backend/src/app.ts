import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { usersRoutes } from "./http/controller/user/Routes";
import { convertionRoutes } from "./http/controller/conversion/Routes";
import { currencyRoutes } from "./http/controller/currency/Routes";

export const app = fastify();

app.register(fastifyCookie)

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

try{
    app.register(usersRoutes)
    app.register(convertionRoutes)
    app.register(currencyRoutes)

}catch(error){
    console.error("Failed to register routes", error)
    process.exit(1)
}
