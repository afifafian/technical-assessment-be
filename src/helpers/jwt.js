import jwt from 'jsonwebtoken';

const options = {
	expiresIn: `${process.env.JWT_LIFETIME} hour`,
	issuer: 'test_be_ta'
};

const jwtSign = (payload) => {
  try {
    delete payload.password;
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (err) {
    throw err;
  }
};

const jwtVerify = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return userData;
  } catch (err) {
    throw err;
  }
};

export {
  jwtSign,
  jwtVerify,
};
