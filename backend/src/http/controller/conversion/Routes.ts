import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { DeleteConvertionByDate, DeleteConvertionById } from "./delete";
import { conversionErrorResponse, conversionResponse, conversionSchema, createConversionBody } from "../schemas/convertion.schema";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function convertionRoutes(app: FastifyInstance){
    app.post('/conversion',{
        onRequest: [verifyJWT],
        schema:{
            ...conversionSchema,
            description: "Create new conversion",
            body: createConversionBody,
            response:{
                201:{
                    description: "Created",
                    ...conversionResponse
                },
                400:{
                    description: "Invalid request",
                    ...conversionErrorResponse
                }
            }
        }
    }, create)

    app.delete<{Params: {id: string}}>("/conversion/:id", {
        onRequest: [verifyJWT],
        schema:{
            ...conversionSchema,
            summary: "Delete conversion by ID",
            params:{
                type: "object",
                properties:{
                    id: {type: "string", description: "Conversion ID"}
                },
                required: ["id"]
            },
            response:{
                200:{
                    description: "Ok",
                    ...conversionResponse
                },
                404:{
                    description: "Convertion not found",
                    ...conversionErrorResponse
                },
                400:{
                    description: "Invalid request",
                    ...conversionErrorResponse
                }
            }
        }
    },DeleteConvertionById)


    app.delete<{Params: {days: string}}>("/conversion/older-than/:days", {
        onRequest: [verifyJWT],
        schema: {
            ...conversionSchema,
            summary: "Delete conversion after 15 days",
            params:{
                type: "object",
                properties:{
                    days: {type: "number", minimum: 1, examples: [15]}
                },
                required: ["days"]
            },
            response:{
                200:{
                    description: "Ok",
                    type: "object",
                    properties:{
                        deletedCount: {type: "number", examples: [10]}
                    }
                },
                
                400:{
                    description: "Invalid request",
                    ...conversionErrorResponse
                }
            }
        }
    },DeleteConvertionByDate)
}