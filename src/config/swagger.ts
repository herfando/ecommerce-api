export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API",
            version: "1.0.0"
        }
    },
    apis: ["./src/routes/*.ts"]
};