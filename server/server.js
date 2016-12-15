if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start();
  require('@google/cloud-debug').start();
}

const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const logging = require('./config/logging.js');
const routes = require('./config/routes.js');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(logging.requestLogger);
}
app.use(express.static(`${__dirname}/../client`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logging.errorLogger);
routes(app);


if (process.env.GCLOUD_PROJECT) {
  logging.info(`using project ${process.env.GCLOUD_PROJECT}`);
} else {
  logging.warn('no gcloud project provided');
}

const port = process.env.PORT || 3030;
app.listen(port, () => {
  logging.info(`listening on *:${port}`);
});
