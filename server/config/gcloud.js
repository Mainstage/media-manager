const projectId = process.env.GCLOUD_PROJECT || 'media-manager';

const gcloud = require('@google-cloud/storage')({
  projectId,
  keyFilename: `./server/config/keys/${projectId}.json`,
});

module.exports = gcloud();
