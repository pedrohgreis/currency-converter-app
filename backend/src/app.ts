import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { usersRoutes } from "./http/controller/user/Routes";
import { convertionRoutes } from "./http/controller/conversion/Routes";
import { currencyRoutes } from "./http/controller/currency/Routes";

export const app = fastify({logger: true});

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

app.register(swagger, {
    openapi:{
        info:{
            title: "Currency Converter API",
            description: "API documentation",
            version: "1.0.0"
        },

        servers:[
            {
                url: "http://localhost:3333",

            },
        ],

        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    }
})

app.register(swaggerUI, {
    routePrefix: "/docs"
})

try{
    app.register(usersRoutes)
    app.register(convertionRoutes)
    app.register(currencyRoutes)

}catch(error){
    console.error("Failed to register routes", error)
    process.exit(1)
}
