/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('user_captured_pokemon', (table) => {
    table.increments('id', { primaryKey: true } );
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('pokemon_id').unsigned().references('id').inTable('pokemon');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('user_captured_pokemon');
}
