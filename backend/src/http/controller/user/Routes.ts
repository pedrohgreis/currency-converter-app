import type { FastifyInstance } from "fastify";
import { Register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance){
    app.post('/user', Register)
    app.post('/session', authenticate)

    app.patch('/token/refresh', refresh)

    // route when user is logged in
    app.get() 
}