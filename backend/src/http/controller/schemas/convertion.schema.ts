
export const conversionSchema = {
    tags: ["Conversion"],
    description: "Conversion Operation"
}

export const createConversionBody = {
    type: "object",
    required: ["amount"],
    properties:{
        amount: {type: "number"}
    }
}

export const conversionResponse = {
    type: "object",
    properties:{
        id: {type: "string"},
        amount: {type: "number"},
        fromCurrencyId: {type: "string"},
        toCurrencyId: {type: "string"},
        createdAt: {type: "string", format: "date-time"}
    }
}

export const conversionArrayResponse = {
    type: "array",
    items: conversionResponse
}

export const conversionErrorResponse = {
    type: "object",
    properties:{
        message:{type: "string", examples: ["Error"]},
        statusCode: {type: "number", examples: [400]}
    }
}