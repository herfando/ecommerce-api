export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Core API",
            version: "1.0.0",
            description: "Scalable Ecommerce Backend with Node.js & MongoDB",
            contact: {
                name: "Herfando",
                url: "https://wa.me/6281234567890"
            }
        },
        servers: [{ url: "/" }] // pakai relatif, Railway handle domain
    },
    apis: ["./src/routes/*.ts"] // pastikan folder routes dan file ts ada di sini
};