/* eslint-disable no-restricted-syntax */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpsRedirect = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.get('host')}${request.url}`);
  }
  return next();
};

if (process.env.NODE_ENV === 'production') { app.use(httpsRedirect); }

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Build Your Own Backend';

app.get('/api/v1/games', (request, response) => {
  database('games').select()
    .then(games => response.status(200).json(games))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/records', (request, response) => {
  database('records').select()
    .then(records => response.status(200).json(records))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/games/:id', (request, response) => {
  const { id } = request.params;

  database('games').where('id', id).select()
    .then((game) => {
      if (game) {
        return response.status(200).json(game);
      }
      return response.status(404).json({
        error: `Unable to locate record with id of ${id}`,
      });
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/records/:id', (request, response) => {
  const { id } = request.params;

  database('records').where('id', id).select()
    .then((record) => {
      if (record) {
        return response.status(200).json(record);
      }
      return response.status(404).json({
        error: `Unable to locate record with id of ${id}`,
      });
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/games/:id/records', (request, response) => {
  const { id } = request.params;

  database('records').where('game_id', id).select()
    .then((records) => {
      if (records) {
        return response.status(200).json(records);
      }
      return response.status(404).json({
        error: `Unable to locate game record with id of ${id}`,
      });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/games', (request, response) => {
  const game = request.body;

  for (const requiredParameter of ['game_title']) {
    if (!game[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property.`,
      });
    }
  }
  database('games').insert(game, '*')
    .then((game) => {
      return response.status(201).json(game);
    })
    .catch(error => response.status(500).json({ error }));
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});
