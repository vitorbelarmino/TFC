import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';

class LoginValidate {
  static validade(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) throw new CustomError(400, 'All fields must be filled');
    return next();
  }
}

export default LoginValidate;
