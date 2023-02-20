import knex from '../config/knex/knex.js';
import variables from '../helpers/variables.js';

const pokemonTable = variables.tableNames.pokemon;
const userCapturedPokemonTable = variables.tableNames.userCapturedPokemon;

export class PokemonServices {
  static async getPokemons(queries, userData) {
    try {
      // Basic Query Identifiers
      let select = [
        `${pokemonTable}.id`, `${pokemonTable}.name`, `${pokemonTable}.image`,
        `${pokemonTable}.monster_category`, `${pokemonTable}.type`
      ];
      let joinQuery = ``;
      let where = ``;

      if (queries.type) {
        const type = queries.type.toUpperCase().replaceAll(" ", "").split(',');
        const formattedType = JSON.stringify(type).replaceAll("\"", "'")
        where += `
          ARRAY ${formattedType} && ${pokemonTable}.type
        `;
      }

      if (userData) {
        joinQuery += `LEFT JOIN ${userCapturedPokemonTable} 
          ON ${userCapturedPokemonTable}.pokemon_id = ${pokemonTable}.id
          AND ${userCapturedPokemonTable}.user_id = ${userData.id}
        `;
        select.push(`${userCapturedPokemonTable}.id AS id_captured_pokemon`)
      }

      const pokemons = await knex(pokemonTable)
        .select(select)
        .joinRaw(joinQuery)
        .whereILike(`${pokemonTable}.name`, `%${queries.search}%`)
        .whereRaw(where)
        .orderBy(`${pokemonTable}.${queries.sortBy}`, queries.sortType);
      
      return pokemons;
    } catch (err) {
      throw err;
    }
  }

  static async getPokemon(id, userData) {
    try {
      const select = [`${pokemonTable}.*`];
      let joinQuery = ``;

      if (userData) {
        joinQuery += `LEFT JOIN ${userCapturedPokemonTable} 
          ON ${userCapturedPokemonTable}.pokemon_id = ${pokemonTable}.id
          AND ${userCapturedPokemonTable}.user_id = ${userData.id}
        `;
        select.push(`${userCapturedPokemonTable}.id AS id_captured_pokemon`)
      }

      const pokemon = await knex(pokemonTable)
        .select(select)
        .joinRaw(joinQuery)
        .where(`${pokemonTable}.id`, id)
        .limit(1);

      return pokemon[0];
    } catch (err) {
      throw err;
    }
  }

  static async insertPokemon(body) {
    try {
      const trimmedType = body.type.map(e => e.toUpperCase());
      const dataInsert = { ...body, type: trimmedType };
      const newPokemon = await knex(pokemonTable)
        .insert(dataInsert)
        .returning("*");

      return newPokemon;
    } catch (err) {
      throw err;
    }
  }

  static async updatePokemon(id, body) {
    try {
      const trimmedType = body.type.map(e => e.toUpperCase());
      const dataUpdate = { ...body, type: trimmedType };
      const updatedPokemon = await knex(pokemonTable)
        .update(dataUpdate)
        .where('id', id)
        .returning('*');

      return updatedPokemon;
    } catch (err) {
      throw err;
    }
  }

  static async deletePokemon(id) {
    try {
      const deletedPokemon = await knex(pokemonTable)
        .delete()
        .where('id', id);

      return deletedPokemon;
    } catch (err) {
      throw err;
    }
  }
}
