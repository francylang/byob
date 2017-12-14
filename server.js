/* eslint-disable no-restricted-syntax, camelcase */
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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
console.log(process.env.NODE_ENV);
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Build Your Own Backend';

const checkAdmin = (request, response, next) => {
  const secret = process.env.DB_SECRET;
  const token =
    request.body.token ||
    request.param('token') ||
    request.headers.authorization;

  const decoded = jwt.verify(token, secret);

  decoded.admin ?
    next() :
    response.status(403).send('Invalid request credentials')

  //  is this error handling redundant? error codes correct? idk
};

app.post('/api/v1/authenticate', (request, response) => {

  const emailSuffix = request.body.email.split('@')[1];

  for (let requiredParameter of ['email', 'appName']) {
    if (!request.body[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format of { email: <string>, appName: <string> }. You are missing a ${requiredParameter} property`
      })
    }
  }

  const payload = emailSuffix === 'turing.io' ?
    Object.assign({}, request.body, { admin: true }) :
    Object.assign({}, request.body, { admin: false })

  const token = jwt.sign(payload, process.env.DB_SECRET, { expiresIn: '2 days' });

  response.status(201).send({ token })
})

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

app.post('/api/v1/games', checkAdmin, (request, response) => {
  const game = Object.assign({}, {game_title: request.body.game_title}, {game_image: request.body.game_image});

  for (const requiredParameter of ['game_title']) {
    if (!game[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property.`,
      });
    }
  }
  return database('games').insert(game, '*')
    .then(() => response.status(201).json(game))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/games/:id/records', checkAdmin, (request, response) => {
  const record = request.body;

  for (const requiredParameter of ['handle', 'rank', 'time', 'game_id']) {
    if (!record[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property.`,
      });
    }
  }
  return database('records').insert(record, '*')
    .then(() => response.status(201).json(record))
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/records/:id', checkAdmin, (request, response) => {
  const { id } = request.params;

  database('records').where({ id }).del()
    .then((record) => {
      if (record) {
        response.sendStatus(204);
      }
      response.status(422).json({ error: `No resource with an id of ${id} was found.` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/games/:id', checkAdmin, (request, response) => {
  const { id } = request.params;

  database('games').where({ id }).del()
    .then((game) => {
      if (game) {
        response.sendStatus(204);
      }
      response.status(422).json({ error: `No resource with an id of ${id} was found.` });
    })
    .catch(error => response.status(500).json({ error }));

  database('records').where({ game_id: id }).del()
    .then((record) => {
      if (record) {
        response.sendStatus(204);
      }
      response.status(422).json({ error: `No resource with an id of ${id} was found` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/records/:id', checkAdmin, (request, response) => {
  const { handle, rank, time } = request.body;
  const { id } = request.params;

  database('records').where({ id }).update({ handle, rank, time })
    .then((record) => {
      if (record) {
        response.sendStatus(200).json(record);
      }
      response.status(422).json(`No resource with an id of ${id} was found`);
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/games/:id', checkAdmin, (request, response) => {
  const { game_title, game_image } = request.body;
  const { id } = request.params;

  database('games').where({ id }).update({ game_title, game_image })
    .then((game) => {
      if (game) {
        response.sendStatus(200).json(game);
      }
      response.status(422).json(`No resource with an id of ${id} was found`);
    })
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

module.exports = app;
