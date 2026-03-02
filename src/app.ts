import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger";
import productRoutes from "./routes/productRoutes";



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

// Swagger setup
const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Test route
app.get("/", (req, res) => {
    res.send("Ecommerce API Running...");
});

export default app;