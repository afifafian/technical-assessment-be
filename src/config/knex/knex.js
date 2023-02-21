import knex from 'knex';
import knexConfig from '../../../knexfile.js';
const environment = 'development';

export default knex(knexConfig[environment]);
