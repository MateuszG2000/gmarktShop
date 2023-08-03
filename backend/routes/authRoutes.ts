import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as validators from '../utils/validators';
const isAuth = require('../authorized');

const router = Router();
router.post('/signup', validators.validateEmail, authController.signup);
router.post('/login', authController.login);
router.get('/', isAuth, authController.getUsers);
router.get('/logout', authController.logOut);
export default router;
