import { Request, Response } from 'express';
import LoginService from './LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const login = req.body;
    const token = await LoginService.Login(login);
    return res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;
    const role = await LoginService.validate(token);
    res.status(200).json({ role });
  }
}

export default LoginController;
