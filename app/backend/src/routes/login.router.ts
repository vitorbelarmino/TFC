import { Router } from 'express';
import LoginController from '../login/LoginController';

const router = Router();
console.log('cheguei');

router.post('/login', LoginController.login);

export default router;
