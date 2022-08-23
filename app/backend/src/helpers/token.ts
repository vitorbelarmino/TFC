import * as jwt from 'jsonwebtoken';
import CustomError from './CustomError';
import ILogin from '../entities/ILogin';

class Token {
  static async createToken(info: ILogin) {
    const generate = jwt.sign(info, process.env.JWT_SECRET || 'senha', {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return generate;
  }

  static async validateToken(token: string) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET || 'senha') as ILogin;
      return user;
    } catch (error) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  }
}

export default Token;
