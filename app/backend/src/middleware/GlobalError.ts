import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';

const globalError = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({ message });
};

export default globalError;
