import * as bcrypt from 'bcryptjs';
import CustomError from './CustomError';

export default class BCrypt {
  static encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static VerifyPassword(password: string, hash: string) {
    const compare = bcrypt.compareSync(password, hash);
    if (!compare) {
      throw new CustomError(400, 'Password does not match');
    }
  }
}
