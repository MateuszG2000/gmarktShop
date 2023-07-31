import Router from "express";
import * as order from "../controllers/orderController";
const router = Router();

router.post("/add", order.add);
router.get("/all", order.getAll);
router.get("/user", order.getUserOrder);
router.put("/update", order.update);
router.get("/:id", order.get);
export default router;
