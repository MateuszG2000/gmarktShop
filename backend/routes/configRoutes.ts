import Router from 'express';
import * as config from '../controllers/configController';
import * as userController from '../controllers/userController';

const router = Router();

router
  .route('/shipping/:id')
  .delete(userController.isAuth('admin'), config.deleteShipping);
router
  .route('/shipping')
  .put(userController.isAuth('admin'), config.createShipping);
router
  .route('/matching')
  .get(config.getMatchingOptions)
  .post(userController.isAuth('admin'), config.updateMatchingOptions);
router.route('/').get(config.getConfig);
export default router;
