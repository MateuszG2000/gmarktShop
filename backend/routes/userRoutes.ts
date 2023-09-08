import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as validators from '../utils/validators';

const router = Router();
router.post('/signup', validators.validateEmail, userController.signup);
router.post('/login', userController.login);
router.post('/updatepassword', userController.updatePassword);
router.post('/updateaddress', userController.updateAddress);

router.get('/', userController.isAuth('admin'), userController.getUsers);
router.get(
  '/getuser',
  userController.isAuth('user', 'admin'),
  userController.getUser
);

router.get('/logout', userController.logOut);

export default router;
