import Router from 'express';
const router = Router();
import * as order from '../controllers/orderController';
import * as userController from '../controllers/userController';

router.route('/all').get(userController.isAuth('admin'), order.getOrders);
router
  .route('/:id')
  .get(userController.isAuth('admin'), order.getOrder)
  .patch(userController.isAuth('admin'), order.updateOrder)
  .delete(userController.isAuth('admin'), order.deleteOrder);
router
  .route('/')
  .get(userController.isAuth('user', 'admin'), order.getOrdersToUser)
  .post(order.createOrder);
export default router;
