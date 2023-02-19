/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pokemon', (table) => {
    table.increments('id', { primaryKey: true } );
    table.string('name', 255).notNullable();
    table.string('monster_category', 255).notNullable();
    table.text('description').notNullable();
    table.text('image');
    table.specificType('type', 'text ARRAY').notNullable();
    table.jsonb('base_stats').defaultTo('{"hp": 0, "def": 0, "speed": 0, "attack": 0}');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('pokemon');
}
