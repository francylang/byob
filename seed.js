const gamesData = require('./games-results')

// each game is an array of three things: game info, runners info, records info

const createGames = (knex, game) => {
  return knex('games').insert({
    title: game[0].title,
    image: game[0].image
  }, 'id')
  .then(gameId => {
    let recordPromises = [];

    game[2].records.forEach(record => {
      recordPromises.push(
        createRecord(knex, {
          game_id: gameId[0],
          handle: record.username,
          rank: record.ranking,
          time: record.time,
        }) // returns a record promise
      )
    });  // returns an array of record promieses

    return Promise.all(recordPromises); // resolves records promises
  }) // returns a game promise
};

const createRecord = (knex, record) => {
  return knex('records').insert(record);
}; // returns a record promise

exports.seed = (knex, Promise) => {
  return knex('records').del() // delete records first
    .then(() => knex('games').del()) // delete all games
    .then(() => {
      let gamePromises = [];

      gamesData.forEach(game => {
        gamePromises.push(createGames(knex, game));
      }); // return array of games promises

      return Promise.all(gamePromises); // resolve games promises
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
