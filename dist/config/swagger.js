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
        servers: [
            { url: "http://54.151.163.46:5000" } // pake IP publik EC2
        ]
    },
    apis: ["./src/routes/*.ts"]
};
