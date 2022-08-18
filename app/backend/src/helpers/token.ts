import * as jwt from 'jsonwebtoken';
import ILogin from '../login/LoginInterface';

class token {
  static async createToken(info: ILogin) {
    const generate = jwt.sign({ user: info }, process.env.JWT_SECRET || 'senha', {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    console.log(generate);
    return generate;
  }
}

export default token;
