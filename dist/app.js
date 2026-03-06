import express from "express.js";
import cors from "cors.js";
import swaggerUi from "swagger-ui-express.js";
import swaggerJsDoc from "swagger-jsdoc.js";
import dotenv from "dotenv";
import { swaggerOptions } from "./config/swagge.jsr";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// Swagger setup
const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Test route
app.get("/", (req, res) => {
  res.send("Ecommerce API Running...");
});
export default app;
