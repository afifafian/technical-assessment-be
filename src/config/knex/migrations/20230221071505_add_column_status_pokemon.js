/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
  return knex.schema.raw(
    "ALTER TABLE pokemon ADD COLUMN status character varying DEFAULT 'ACTIVE'",
  );
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.raw(
    'ALTER TABLE pokemon DROP COLUMN status',
  );
}
