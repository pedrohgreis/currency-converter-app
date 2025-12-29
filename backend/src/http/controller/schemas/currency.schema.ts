//Schemas for documentation

export const currencySchema = {
    tags: ["Currency"],
    description: "currency operation"
}

export const createCurrencyBody = {
    type: "object",
    required: ["name","code","symbol"],
    properties:{
        name: {type: "string", examples: ["US Dollar"]},
        code: {type: "string", examples: ["USD"]},
        symbol: {type: "string", examples: ["$"]}
    }
}

export const currencyResponse = {
    type: "object",
    properties:{
        id: {type: "string"},
        name: {type: "string"},
        code: {type: "string"},
        symbol: {type: "string"},
        createdAt: {type: "string", format: "date-time"}
    }
}


export const currencyArrayResponse = {
    type: "array",
    items: currencyResponse
}

export const errorResponse = {
    type: "object",
    properties:{
        message:{type: "string", examples: ["Error"]},
        statusCode: {type: "number", examples: [400]}
    }
}