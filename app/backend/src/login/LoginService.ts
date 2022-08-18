import token from '../helpers/token';
import ILogin from './LoginInterface';

class LoginService {
  static async Login(login:ILogin) {
    const getToken = await token.createToken(login);
    return getToken;
  }
}

export default LoginService;
