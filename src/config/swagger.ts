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
            {
                url: "http://localhost:5000",
                description: "Local Server"
            },
            {
                url: "http://54.151.163.46:5000",
                description: "Production Server"
            }
        ],

        components: {
            schemas: {

                Product: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "69a7d4294ecfc7d68639b4fa" },
                        id: { type: "number", example: 4 },
                        title: { type: "string", example: "Red Lipstick" },
                        description: {
                            type: "string",
                            example: "The Red Lipstick is a classic and bold choice..."
                        },
                        category: { type: "string", example: "beauty" },
                        price: { type: "number", example: 12.99 },
                        discountPercentage: { type: "number", example: 12.16 },
                        rating: { type: "number", example: 4.36 },
                        stock: { type: "number", example: 91 },
                        tags: {
                            type: "array",
                            items: { type: "string" },
                            example: ["makeup", "lip"]
                        },
                        brand: { type: "string", example: "Chic Cosmetics" },
                        sku: { type: "string", example: "BEA-CHI-LIP-004" },
                        weight: { type: "number", example: 1 },
                        dimensions: { type: "object" },
                        warrantyInformation: {
                            type: "string",
                            example: "3 year warranty"
                        },
                        shippingInformation: {
                            type: "string",
                            example: "Ships in 1 week"
                        },
                        availabilityStatus: {
                            type: "string",
                            example: "In Stock"
                        },
                        reviews: {
                            type: "array",
                            items: { type: "object" }
                        },
                        returnPolicy: {
                            type: "string",
                            example: "7 days return policy"
                        },
                        minimumOrderQuantity: {
                            type: "number",
                            example: 40
                        },
                        meta: { type: "object" },

                        images: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    thumbnail: { type: "string" }
                                }
                            }
                        }
                    }
                },

                ProductInput: {
                    type: "object",
                    required: ["title", "price", "stock", "category"],
                    properties: {
                        title: { type: "string", example: "Red Lipstick" },
                        description: {
                            type: "string",
                            example: "The Red Lipstick is a classic..."
                        },
                        price: { type: "number", example: 12.99 },
                        stock: { type: "number", example: 91 },
                        image: {
                            type: "string",
                            example:
                                "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.jpg"
                        },
                        category: { type: "string", example: "beauty" }
                    }
                },

                Store: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "65f1c1c7e91e5d8f1d8c4a23" },
                        storeName: { type: "string", example: "Herfando Store" },
                        storeDomain: { type: "string", example: "herfando-shop" },
                        city: { type: "string", example: "Palembang" },
                        postalCode: { type: "string", example: "30111" },
                        address: {
                            type: "string",
                            example: "Jl Sudirman No 20"
                        },
                        createdAt: {
                            type: "string",
                            example: "2026-03-14T10:00:00Z"
                        }
                    }
                },

                StoreInput: {
                    type: "object",
                    required: [
                        "storeName",
                        "storeDomain",
                        "city",
                        "postalCode",
                        "address"
                    ],
                    properties: {
                        storeName: {
                            type: "string",
                            example: "Herfando Store"
                        },
                        storeDomain: {
                            type: "string",
                            example: "herfando-shop"
                        },
                        city: {
                            type: "string",
                            example: "Palembang"
                        },
                        postalCode: {
                            type: "string",
                            example: "30111"
                        },
                        address: {
                            type: "string",
                            example: "Jl Sudirman No 20"
                        }
                    }
                }

            }
        }
    },

    apis: ["./src/routes/**/*.ts"]
};