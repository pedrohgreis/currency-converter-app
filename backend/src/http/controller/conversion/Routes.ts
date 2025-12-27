import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { DeleteConvertionByDate, DeleteConvertionById } from "./delete";

export async function convertionRoutes(app: FastifyInstance){
    app.post('/convertion', create)

    app.delete("/convertion/:id", DeleteConvertionById)
    app.delete("/convertion/older-than/:days", DeleteConvertionByDate)
}