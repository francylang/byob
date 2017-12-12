
const gamesData = require('../../../games-results.json');


const createRecord = (knex, record) => (
  knex('records').insert(record)
); // returns a record promise

// each game is an array of three things: game info, runners info, records info
const createGames = (knex, game) => (
  knex('games').insert({
    title: game[0].title,
    image: game[0].image,
  }, 'id')
    .then((gameId) => {
      const recordPromises = [];

      game[2].records.forEach((record) => {
        recordPromises.push(
          createRecord(knex, {
            game_id: gameId[0],
            handle: record.username,
            rank: record.ranking,
            time: record.time,
          }), // returns a record promise
        );
      });// returns an array of record promieses

      return Promise.all(recordPromises); // resolves records promises
    }) // returns a game promise
);

exports.seed = (knex, Promise) => (
  knex('records').del() // delete records first
    .then(() => knex('games').del()) // delete all games
    .then(() => {
      const gamePromises = [];

      gamesData.forEach((game) => {
        gamePromises.push(createGames(knex, game));
      }); // return array of games promises

      return Promise.all(gamePromises); // resolve games promises
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
);
