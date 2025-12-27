import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { DeleteCurrency } from "./delete";
import { GetAllCurrencies } from "./getCurrency";

export async function currencyRoutes(app:FastifyInstance){
    app.post("/currency", create)
    app.delete("/currency/:id", DeleteCurrency)

    app.get("/currencies", GetAllCurrencies)
    
}