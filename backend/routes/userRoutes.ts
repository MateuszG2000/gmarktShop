import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as validators from '../utils/validators';

const router = Router();
router.post('/signup', validators.validateEmail, userController.signup);
router.post('/login', userController.login);
router.post(
  '/password',
  userController.isAuth('user'),
  userController.updatePassword
);
router.post(
  '/address',
  userController.isAuth('user'),
  userController.updateAddress
);

router.get('/', userController.isAuth('admin'), userController.getUsers);
router.get(
  '/user',
  userController.isAuth('user', 'admin'),
  userController.getUser
);

router.get('/logout', userController.logOut);

export default router;
