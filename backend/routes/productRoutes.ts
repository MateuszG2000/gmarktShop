import Router from 'express';
const router = Router();
import * as product from '../controllers/productController';
import * as user from '../controllers/userController';

router
  .route('/:id')
  .get(product.getProduct)
  .patch(product.updateProduct)
  .delete(product.deleteProduct);
router.get('/', product.getProducts);

router.post(
  '/',
  user.isAuth('admin'),
  product.uploadPhoto,
  product.createProduct
);

export default router;
