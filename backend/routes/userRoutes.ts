import { Router } from 'express';
import * as authController from '../controllers/userController';
import * as validators from '../utils/validators';

const router = Router();
router.post('/signup', validators.validateEmail, authController.signup);
router.post('/login', authController.login);
router.get('/', authController.isAuth('admin'), authController.getUsers);
router.get('/logout', authController.logOut);

export default router;
