import Router from "express";
const router = Router();
import * as product from "../controllers/productController";

router.get("/:id", product.getProduct);
router
  .route("/:id")
  .get(product.getProduct)
  .patch(product.updateProduct)
  .delete(product.deleteProduct);
router.get("/", product.getProducts);
router.post("/", product.createProduct);
export default router;
