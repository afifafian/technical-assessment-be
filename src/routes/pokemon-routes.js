import express from 'express';
import { PokemonControllers } from '../controllers/pokemon.js';
import { closedAuth, openAuth, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', openAuth, PokemonControllers.get);
router.get('/:id', openAuth, PokemonControllers.getDetail);
router.post('/', closedAuth, adminOnly, PokemonControllers.create);
router.put('/:id', closedAuth, adminOnly, PokemonControllers.update);
router.patch('/delete/:id', closedAuth, adminOnly, PokemonControllers.softDelete);

export default router;
