import express from 'express';
import userRoutes from './user-routes.js';
import pokemonRoutes from './pokemon-routes.js';
import userCapturedPokemonRoutes from './user-captured-pokemon-routes.js';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/pokemon', pokemonRoutes);
routes.use('/user-captured-pokemon', userCapturedPokemonRoutes);

export default routes;
