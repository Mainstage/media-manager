if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start();
  require('@google/cloud-debug').start();
}

const express = require('express');
const bodyParser = require('body-parser');
const logging = require('./config/logging.js');

const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(logging.requestLogger);
}

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(`${__dirname}/../client`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/routes.js')(app);

app.use(logging.errorLogger);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
  res.status(500).send(err.response || 'Something broke!');
});

if (process.env.GCLOUD_PROJECT) {
  logging.info(`using project ${process.env.GCLOUD_PROJECT}`);
} else {
  logging.warn('no gcloud project provided');
}

const port = process.env.PORT || 3030;
app.listen(port, () => {
  logging.info(`listening on *:${port}`);
});
