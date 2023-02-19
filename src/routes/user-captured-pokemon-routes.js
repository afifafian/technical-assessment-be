import express from 'express';
import { UserCapturedPokemonControllers } from '../controllers/user-captured-pokemon.js';
import { closedAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', closedAuth, UserCapturedPokemonControllers.create);
router.delete('/:pokemonId', closedAuth, UserCapturedPokemonControllers.destroy);

export default router;
