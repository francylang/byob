const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpsRedirect = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.get('host')}${request.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') { app.use(httpsRedirect); }

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Build Your Own Backend';

app.get('/api/v1/games', (request, response) => {
  database('games').select()
    .then((games) => {
      return response.status(200).json(games)
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/records', (request, response) => {
  database('records').select()
    .then((records) => {
      return response.status(200).json(records)
    })
    .catch((error) => {
      return response.status(500).json({ error })
    })
})

app.get('/api/v1/games/:id', (request, response) => {
  const { id } = request.params;

  database('games').where('id', id).select()
    .then(game => {
      if (game) {
        console.log(game[0])
        return reponse.status(200).json(game);
      }
      return response.status(404).json({
        error: `Unable to locate record with id of ${id}`
      })
    })
    .catch(error => {
      return response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})
