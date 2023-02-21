export default {
  tableNames: {
    user: 'users',
    pokemon: 'pokemon',
    userCapturedPokemon: 'user_captured_pokemon',
  },
  pokemonTypes: ['GRASS', 'PSYCHIC', 'FIRE', 'FLYING', 'WATER', 'ELECTRIC', 'BUG'],
  pokemonStatus: { active: 'ACTIVE', deleted: 'DELETED' },
  roles: {
    admin: 'Admin',
    user: 'User',
  },
  errNames: {
    customValidation: 'CustomValidation',
    jsonWebToken: {
      jwtMalformed: 'JsonWebTokenError',
      tokenExpired: 'TokenExpiredError'
    }
  }
};
