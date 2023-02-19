import knex from '../config/knex/knex.js';
import { hash } from '../helpers/bcrypt.js';
import variables from '../helpers/variables.js';

export class UserServices {
  static async findByUsername(username) {
    try {
      const user = await knex('users').select('*').where('username', username);
      return user[0];
    } catch (err) {
      throw err;
    }
  }

  static async createUser(dataInsert) {
    try {
      const isExist = await this.findByUsername(dataInsert.username);
      if (isExist) throw { name: variables.errNames.customValidation, message: 'Username is already registered!' };

      const hashedPassword = hash(dataInsert.password);
      Object.assign(dataInsert, { password: hashedPassword });

      const newUser = await knex('users')
        .insert(dataInsert)
        .returning(['id', 'name', 'username']);

      return newUser;
    } catch (err) {
      throw err;
    }
  }
}
