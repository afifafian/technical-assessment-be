import { UserServices } from '../services/index.js';
import { jwtSign } from '../helpers/jwt.js';
import { compare } from '../helpers/bcrypt.js';
import { requestAdjustment, required, isValidRole } from '../helpers/validators.js';
import { UserBodyRequest } from '../dto/user-dto.js';
import variables from '../helpers/variables.js';

export class UserControllers {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserServices.findByUsername(username || '');
      
      if (!user) throw { name: variables.errNames.customValidation, message: 'Username is not registered!', statusCode: 404 };

      if (!compare(password, user.password)) {
        throw { name: variables.errNames.customValidation, message: 'Password doesnt match!', statusCode: 401 };
      }

      const accesToken = jwtSign(user);

      return res.status(200).json({
        message: "Successfully login!",
        accesToken,
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { body } = req;
      const errs = [];
      const input = new UserBodyRequest();
      const fixedBody = requestAdjustment(input, body);

      // Body Request Validations
      errs.push(required(fixedBody, 'name'));
      errs.push(required(fixedBody, 'username'));
      errs.push(required(fixedBody, 'password'));
      errs.push(required(fixedBody, 'role'));
      if (fixedBody.role) errs.push(isValidRole(fixedBody.role, 'role'));

      const errMessages = errs.filter((e) => e !== undefined);
      if (errMessages.length) throw { name: variables.errNames.customValidation, message: errMessages };

      const newUser = await UserServices.createUser(fixedBody);

      return res.status(201).json({
        message: "Successfully register!",
        data: newUser,
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }
}
