import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { DeleteCurrency } from "./delete";
import { GetAllCurrencies, GetCurrencyById } from "./getCurrency";
import { createCurrencyBody, currencyArrayResponse, currencyErrorResponse, currencyResponse, currencySchema } from "../schemas/currency.schema";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function currencyRoutes(app:FastifyInstance){
    app.post("/currency", {
        onRequest: [verifyJWT],
        schema:{
            ...currencySchema,
            description: "Create a new currency",
            body: createCurrencyBody,
            response:{
                201: currencyResponse,
                400: currencyErrorResponse
            },
        }
    }, create)



    app.delete<{Params: {id: string}}>("/currency/:id", {
        onRequest: [verifyJWT],
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
                    ...currencyErrorResponse
                },
                400:{
                    description: "Invalid request",
                    ...currencyErrorResponse
                }
            }
        }
    },DeleteCurrency)

    app.get("/currencies", {
        onRequest: [verifyJWT],
        schema:{
            ...currencySchema,
            summary: "Get currencies",
            response:{
                200: currencyArrayResponse,
                400: currencyErrorResponse
            }
        }
    },GetAllCurrencies)


    app.get<{Params: {id: string}}>("/currencies/:id", {
        onRequest: [verifyJWT],
        schema:{
            ...currencySchema,
            summary: "Get currency by id",
            params:{
                properties:{
                    id: {type: "string", description: "Currency ID"}
                },
                required: ["id"]
            },
            response:{
                200:{
                    description: "Currency ID obtained",
                    ...currencyResponse
                },
                400:{
                    description: "Invalid request",
                    ...currencyErrorResponse
                },
                404:{
                    description: "Currency not found",
                    ...currencyErrorResponse
                },
            }
        }
    }, GetCurrencyById)
    

}