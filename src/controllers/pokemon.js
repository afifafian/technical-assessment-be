import { PokemonServices } from "../services/index.js";
import {
  requestAdjustment, required,
  isValidPokemonType, isValidBaseStats
} from '../helpers/validators.js'
import variables from "../helpers/variables.js";
import {
  PokemonQueryParams, PokemonBodyRequest, PokemonListResponse, PokemonDetailResponse,
} from "../dto/pokemon-dto.js";

export class PokemonControllers {
  static async get(req, res, next) {
    try {
      const { query, userData } = req;
      const queryParams = new PokemonQueryParams();
      const fixedRequest = requestAdjustment(queryParams, query);

      const pokemons = await PokemonServices.getPokemons(fixedRequest, userData);

      return res.status(200).json({
        message: "Successfully fetch all pokemons!",
        data: new PokemonListResponse().setResponse(pokemons),
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { params, userData } = req;
      const pokemon = await PokemonServices.getPokemon(params.id, userData);

      if (!pokemon) {
        throw {
          name: variables.errNames.customValidation,
          message: 'Pokemon data is not found!',
          statusCode: 404
        };
      }

      return res.status(200).json({
        message: "Successfully get pokemon detail!",
        data: new PokemonDetailResponse().setResponse(pokemon),
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;
      const errs = [];
      const input = new PokemonBodyRequest();
      const fixedBody = requestAdjustment(input, body);

      // Body Request Validations
      errs.push(required(fixedBody, 'name'));
      errs.push(required(fixedBody, 'monster_category'));
      errs.push(required(fixedBody, 'description'));
      errs.push(required(fixedBody, 'type'));
      if (fixedBody.type) errs.push(isValidPokemonType(fixedBody.type, 'type'));
      if (fixedBody.base_stats) errs.push(isValidBaseStats(fixedBody.base_stats, input.base_stats, 'base_stats'));

      const errMessages = errs.filter((e) => e !== undefined);
      if (errMessages.length) throw { name: variables.errNames.customValidation, message: errMessages };

      const newPokemon = await PokemonServices.insertPokemon(fixedBody);

      return res.status(201).json({
        message: "Successfully insert new pokemon!",
        data: newPokemon,
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { params, body } = req;
      const errs = [];
      const input = new PokemonBodyRequest();
      const fixedBody = requestAdjustment(input, body);

      const pokemon = await PokemonServices.getPokemon(params.id);
      if (!pokemon) {
        throw {
          name: variables.errNames.customValidation,
          message: 'Pokemon data is not found!',
          statusCode: 404
        };
      }

      // Body Request Validations
      errs.push(required(fixedBody, 'name'));
      errs.push(required(fixedBody, 'monster_category'));
      errs.push(required(fixedBody, 'description'));
      errs.push(required(fixedBody, 'type'));
      if (fixedBody.type) errs.push(isValidPokemonType(fixedBody.type, 'type'));
      if (fixedBody.base_stats) errs.push(isValidBaseStats(fixedBody.base_stats, input.base_stats, 'base_stats'));

      const errMessages = errs.filter((e) => e !== undefined);
      if (errMessages.length) throw { name: variables.errNames.customValidation, message: errMessages };

      const updatedPokemon = await PokemonServices.updatePokemon(params.id, fixedBody);

      return res.status(200).json({
        message: "Successfully update pokemon data!",
        data: updatedPokemon,
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const pokemon = await PokemonServices.getPokemon(id);
      if (!pokemon) {
        throw {
          name: variables.errNames.customValidation,
          message: 'Pokemon data is not found!',
          statusCode: 404
        };
      }

      await PokemonServices.deletePokemon(id);

      return res.status(200).json({
        message: "Successfully delete pokemon data!",
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }
}
