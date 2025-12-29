import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { DeleteCurrency } from "./delete";
import { GetAllCurrencies } from "./getCurrency";
import { createCurrencyBody, currencyArrayResponse, currencyResponse, currencySchema, errorResponse } from "../schemas/currency.schema";

export async function currencyRoutes(app:FastifyInstance){
    app.post("/currency", {
        schema:{
            ...currencySchema,
            description: "Create a new currency",
            body: createCurrencyBody,
            response:{
                201: currencyResponse,
                400: errorResponse
            },
        }
    }, create)



    app.delete("/currency/:id", {
        schema:{
            ...currencySchema,
            summary: "Delete currency",
            params:{
                type: "object",
                properties:{
                    id: {type: "string", description: "Currency ID"}
                },
                required: ["id"]
            },
            response:{
                200:{
                    description: "Ok",
                    ...currencyResponse
                },
                404: {
                    description: "Currency not found",
                    ...errorResponse
                },
                400:{
                    description: "Invalid request",
                    ...errorResponse
                }
            }
        }
    },DeleteCurrency)

    app.get("/currencies", {
        schema:{
            ...currencySchema,
            summary: "Get currencies",
            response:{
                200: currencyArrayResponse,
                400: errorResponse
            }
        }
    },GetAllCurrencies)
    

}