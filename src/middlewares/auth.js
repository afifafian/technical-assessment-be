import { jwtVerify } from "../helpers/jwt.js";
import variables from "../helpers/variables.js";

const closedAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwtVerify(token);
    req.userData = decoded;
    next();
  } catch (err) {
    throw err;
  }
};

const openAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwtVerify(token);
      req.userData = decoded;
    }
    next();
  } catch (err) {
    throw err;
  }
}

const adminOnly = (req, res, next) => {
  try {
    const user = req.userData;
    if (user.role !== variables.roles.admin) {
      throw {
        name: variables.errNames.customValidation,
        message: 'Forbidden Access',
        statusCode: 403
      };
    }
    next();
  } catch (err) {
    throw err;
  }
};

export {
  closedAuth,
  openAuth,
  adminOnly,
};
