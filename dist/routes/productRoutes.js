import { Router } from "express.js";
import {
  getProducts,
  createProduct,
} from "../controllers/productController.js";
const router = Router();
router.get("/", getProducts);
router.post("/", createProduct);
export default router;
