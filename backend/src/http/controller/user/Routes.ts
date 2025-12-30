import type { FastifyInstance } from "fastify";
import { Register } from "./register";
import { Authenticate } from "./auth";
import { Profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";
import { authResponse, createUserBody, loginUserBody, unauthorizedResponse, userErrorResponse, userResponse, userSchema } from "../schemas/user.schema";
import { Delete } from "./delete";
import { currencyResponse } from "../schemas/currency.schema";

export async function usersRoutes(app: FastifyInstance){
    app.post('/users', {
        schema:{
            ...userSchema,
            description: "Create new user",
            body: createUserBody,
            response:{
                201:{
                    description: "User created",
                    ...userResponse
                },
                400:{
                    description: "Invalid request",
                    ...userErrorResponse
                }
            }
        }
    },Register)


    app.post('/session', {
        schema:{
            ...userSchema,
            description: "Authentication",
            body: loginUserBody,
            response:{
                200:{
                    description: "Authenticated",
                    ...authResponse
                },
                400:{
                    description: "Invalid request",
                    ...userErrorResponse
                },
                401:{
                    description: "Unauthorized",
                    ...unauthorizedResponse
                }
            }
        }
    },Authenticate)

    app.patch('/token/refresh', {
        schema:{
            ...userSchema,
            description: "Refresh access token",
            response:{
                200:{
                    description: "Authenticated",
                    ...authResponse
                },
                400:{
                    description: "Invalid request",
                    ...userErrorResponse
                }
            }
        }
    },refresh)

    // route when user is logged in
    app.get('/me', {
        onRequest: [verifyJWT],
        schema:{
            ...userSchema,
            summary: "User logged in",
            response:{
                200:{
                    description: "Logged in",
                    ...userResponse
                },
                400:{
                    description: "Invalid request",
                    ...userErrorResponse
                },
                401:{
                    description: "Unauthorized",
                    ...unauthorizedResponse
                }
            }
        }
    },Profile)

    app.delete("/user", {
        onRequest: [verifyJWT],
        schema:{
            ...userSchema,
            summary: "Delete user",
            response:{
                200:{
                    description: "user deleted",
                    ...currencyResponse
                },
                400:{
                    description: "Invalid request",
                    ...userErrorResponse
                },
                401:{
                    description: "User not found",
                    ...userErrorResponse
                }
            }
            
        }
    }, Delete)
}