import Router from "express";
const router = Router();
import * as product from "../controllers/productController";

router.post("/add", product.createProduct);
router.get("/all:num", product.getProduct);
export default router;
