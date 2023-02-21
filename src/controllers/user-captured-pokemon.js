import { UserCapturedPokemonServices, PokemonServices } from "../services/index.js";
import { required, isInteger } from '../helpers/validators.js'
import variables from "../helpers/variables.js";

export class UserCapturedPokemonControllers {
  static async create(req, res, next) {
    try {
      const { body, userData } = req;
      const errMessages = [];

      // Body Request Validations
      errMessages.push(required(body, 'pokemon_id'));
      if ( body.pokemon_id ) errMessages.push(isInteger(body.pokemon_id, 'pokemon_id'));

      const errs = errMessages.filter((e) => e !== undefined);
      if (errs.length) throw { name: variables.errNames.customValidation, message: errs };

      await UserCapturedPokemonServices.capturePokemon(body, userData);

      return res.status(201).json({
        message: "Successfully marked pokemon as captured!",
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { params, userData } = req;

      await UserCapturedPokemonServices.uncapturePokemon(
        params.pokemonId, userData
      );

      return res.status(200).json({
        message: "Successfully unmarked pokemon!",
        request: { type: req.method, url: req.originalUrl }
      });
    } catch (err) {
      next(err);
    }
  }
}
