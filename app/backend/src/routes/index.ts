import { Router } from 'express';
import LoginValidate from '../middleware/LoginValidate';
import LoginController from '../login/LoginController';

const router = Router();

router.post('/login', LoginValidate.validade, LoginController.login)
  .get('/login/validate', LoginController.validate);

export default router;
