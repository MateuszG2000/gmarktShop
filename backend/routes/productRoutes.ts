import Router from 'express';
const router = Router();
import * as product from '../controllers/productController';

router
  .route('/:id')
  .get(product.getProduct)
  .patch(product.updateProduct)
  .delete(product.deleteProduct);
router.get('/', product.getProducts);
router.post('/', product.uploadPhoto, product.createProduct);

export default router;
