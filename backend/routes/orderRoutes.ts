import Router from 'express';
const router = Router();
import * as order from '../controllers/orderController';

router
  .route('/:id')
  .get(order.getOrder)
  .patch(order.updateOrder)
  .delete(order.deleteOrder);
router.route('/').get(order.getOrders).post(order.createOrder);
export default router;
