import CustomError from '../helpers/CustomError';
import Users from '../database/models/UserModels';
import BCrypt from '../helpers/BCrypt';
import Token from '../helpers/token';
import ILogin from './LoginInterface';

class LoginService {
  static async Login(login:ILogin) {
    const getUser = await Users.findOne({ where: { email: login.email } }) as Users;
    if (!getUser) throw new CustomError(401, 'Incorrect email or password');
    BCrypt.VerifyPassword(login.password, getUser.password);
    const getToken = await Token.createToken(login);
    return getToken;
  }

  static async validate(token: string | undefined) {
    if (!token) throw new CustomError(400, 'Token not found');
    const user = await Token.validateToken(token);
    const getUser = await Users.findOne({ where: { email: user.email } }) as Users;

    return getUser.role;
  }
}

export default LoginService;
