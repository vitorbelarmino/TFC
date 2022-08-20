import * as jwt from 'jsonwebtoken';
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
    const user = jwt.verify(token, process.env.JWT_SECRET || 'senha') as ILogin;
    return user;
  }
}

export default Token;
