

exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('games', (table) => {
      table.increments('id').primary();
      table.string('game_title');
      table.string('game_image');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('records', (table) => {
      table.increments('id').primary();
      table.string('handle');
      table.integer('game_id').unsigned();
      table.foreign('game_id').references('games.id');
      table.integer('rank');
      table.string('time');
      table.timestamps(true, true);
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('records'),
    knex.schema.dropTable('games'),
  ])
);
