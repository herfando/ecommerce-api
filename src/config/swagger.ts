export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API",
            version: "1.0.0",
            description: "Ecommerce API documentation"
        },
        servers: [{ url: "/" }] // pakai relatif, Railway handle domain
    },
    apis: ["./src/routes/*.ts"] // pastikan folder routes dan file ts ada di sini
};