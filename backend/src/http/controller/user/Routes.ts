import type { FastifyInstance } from "fastify";
import { Register } from "./register";
import { Authenticate } from "./auth";
import { Profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance){
    app.post('/user', Register)
    app.post('/session', Authenticate)

    app.patch('/token/refresh', refresh)

    // route when user is logged in
    app.get('/me', { onRequest: [verifyJWT] }, Profile)
}