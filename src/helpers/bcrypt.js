import pkg from 'bcryptjs';

const hash = (password) => {
  try {
    const { hashSync } = pkg;
    return hashSync(password, +process.env.BCRYPT_SALT || 10);
  } catch (err) {
    throw err;
  }
};

const compare = (password, userPassword) => {
  try {
    const { compareSync } = pkg;
    return compareSync(password, userPassword);
  } catch (err) {
    throw err;
  }
};

export {
  hash,
  compare,
};
