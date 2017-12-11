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

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Build Your Own Backend';


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})
