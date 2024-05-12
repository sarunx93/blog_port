import express from 'express'
import { register, login, logout, getCurrentUser } from '../controllers/userController.js';
import authen from '../middleware/auth.js';

const router = express.Router();



router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/get-current-user').get(authen, getCurrentUser)


export default router