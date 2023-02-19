import knex from '../config/knex/knex.js';
import variables from '../helpers/variables.js';

const userCapturedPokemonTable = variables.tableNames.userCapturedPokemon;

export class UserCapturedPokemonServices {
  static async capturePokemon(body, userData) {
    try {
      const dataInsert = { pokemon_id: body.pokemon_id, user_id: userData.id };
      const capturedPokemon = await knex(userCapturedPokemonTable)
        .insert(dataInsert)
        .onConflict(['pokemon_id', 'user_id'])
        .ignore();
      return capturedPokemon;
    } catch (err) {
      throw err;
    }
  }

  static async uncapturePokemon(pokemonId, userData) {
    try {
      const deletedPokemon = await knex(userCapturedPokemonTable)
        .delete()
        .whereRaw(`pokemon_id = ${pokemonId} AND user_id = ${userData.id}`);
      return deletedPokemon;
    } catch (err) {
      throw err;
    }
  }
}
