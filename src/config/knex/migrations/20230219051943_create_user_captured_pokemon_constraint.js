/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.raw(
    'ALTER TABLE user_captured_pokemon ADD CONSTRAINT user_captured_pokemon_uc UNIQUE(user_id, pokemon_id)',
  );
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.raw(
    'ALTER TABLE user_captured_pokemon DROP INDEX user_captured_pokemon_uc',
  );
}
