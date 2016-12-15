const gcs = require('../config/gcloud.js');
const logging = require('../config/logging.js');

const sanitize = (string) => {
  const split = string.split('.');
  const now = +new Date();
  return `${split[0].replace(/[^a-z0-9]/gi, '_').toLowerCase()}${now}.${split[1]}`;
};

const upload = (album, filename, buffer, cb) => {
  const saniFile = sanitize(filename);
  logging.info('uploading file ', +new Date());
  const gcsBucket = gcs.bucket(album);
  const file = gcsBucket.file(saniFile);
  const filePipe = file.createWriteStream({ public: true });
  try {
    buffer.pipe(filePipe)
    .on('error', (err) => {
      logging.error('file pipe error', saniFile, err);
      cb(err, null);
    })
    .on('finish', () => {
      logging.debug('complete upload: ', file.metadata.name);
      const { name, bucket } = file.metadata;
      const data = `${bucket}/${name}`;
      cb(null, data);
    })
    .on('end', (arg) => {
      logging.warn('stream ended', arg);
    });
  } catch (err) {
    logging.error('filePipe error', err);
    cb(err, null);
  }
};

const newFile = (req, res) => {
  upload(req.headers.album, req.headers.filename, req, (err, result) => {
    res.send(err || result);
  });
};

module.exports = {
  newFile,
  upload,
};
