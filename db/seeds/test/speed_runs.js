
const gamesData = require('../../../utils/game-results');

const createRecord = (knex, record) => (
  knex('records').insert(record)
);

const createGames = (knex, game) => (
  knex('games').insert({
    game_title: game[0].game.title,
    game_image: game[0].game.image,
  }, 'id')
    .then((gameId) => {
      const recordPromises = [];

      game[2].records.forEach((record) => {
        recordPromises.push(createRecord(knex, {
          handle: record.username,
          rank: record.ranking,
          time: record.time,
          game_id: gameId[0],
        }));
      });
      return Promise.all(recordPromises);
    })
);

exports.seed = (knex, Promise) => (
  knex('records').del()
    .then(() => knex('games').del())
    .then(() => {
      const gamePromises = [];

      gamesData.forEach((game) => {
        gamePromises.push(createGames(knex, game));
      });
      return Promise.all(gamePromises);
    })
    // eslint-disable-next-line
    .catch(error => console.log(`Error seeding data: ${error}`))
);
