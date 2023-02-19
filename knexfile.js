/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'postgresql',
    connection: {
      database: 'ta_db',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/config/knex/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'ta_db',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './src/config/knex/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'ta_db',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './src/config/knex/migrations'
    }
  }
};
