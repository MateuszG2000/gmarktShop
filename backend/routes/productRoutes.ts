import Router from 'express';
const router = Router();
import * as product from '../controllers/productController';
import * as user from '../controllers/userController';

router.get('/match', product.getProductsMatch);
router.route('/:id').get(product.getProduct).patch(product.updateProduct);
router.get('/', product.getProducts);

router.delete('/:id', user.isAuth('admin2'), product.deleteProduct);
router.post('/', user.isAuth('admin2'), product.uploadPhoto, product.createProduct);

export default router;
