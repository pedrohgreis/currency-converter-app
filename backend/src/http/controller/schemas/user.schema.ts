export const userSchema = {
    tags:["User"],
    description: "User operation"
}

export const createUserBody = {
    type: "object",
    required: ["name", "email", "password"],
    properties:{
        name: {type: "string", examples: ["John"]},
        email: {type: "string", examples: ["john@gmail.com"]},
        password: {type: "string", examples: ["123456"]}
    }
}

export const loginUserBody = {
    type: "object",
    required: ["email", "password"],
    properties:{
        email: {type: "string", examples: ["john@gmail.com"]},
        password: {type: "string", examples: ["123456"]}
    }
}

export const authResponse = {
    type: "object",
    properties: {
        token: {type: "string"},
        user: {
            type: "object",
            properties: {
                id: {type: "string"},
                name: {type: "string"},
                email: {type: "string"}
            }
        }
    }
}

export const userResponse = {
    type: "object",
    properties: {
        id: {type: "string"},
        name: {type: "string"},
        email: {type: "string"},
        password: {type: "string"}
    }
}

export const userArrayResponse = {
    type: "array",
    items: userResponse
}

export const userErrorResponse = {
    type: "object",
    properties:{
        message:{type: "string", examples: ["Error"]},
        statusCode:{type:"number", examples: [400]}
    }
}

export const unauthorizedResponse = {
    type: "object",
    properties:{
        message:{type: "string", examples: ["Unauthorized"]},
        statusCode:{type:"number", examples: [401]}
    }
}