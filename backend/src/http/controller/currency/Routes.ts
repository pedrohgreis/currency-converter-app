import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { DeleteCurrency } from "./delete";

export async function currencyRoutes(app:FastifyInstance){
    app.post("/currency", create)
    app.delete("/currency/:id", DeleteCurrency)
}