import Docker from './docker'
import fs from 'fs-extra';

exports.handler = function( event, context, callback ) {
  const docker = new Docker();
  const id = '631cf2b2-9339-7bdf-2f6d-43f84c8c2157-custom-attack-746-cdz';
  const copyQueue = [];

  copyQueue.push(fs.copy(`./audio/${id}-prod.wav`, `/tmp/${id}-prod.wav`));
  copyQueue.push(fs.copy(`./audio/${id}-local.wav`, `/tmp/${id}-local.wav`));

  return Promise.all(copyQueue)
    .then(() => console.log('success!'))
    .then(() => {
      return docker.create(
        'adrienfromtoulouse/docker-xcorrsound',
        [
          `/tmp/${id}-prod.wav`,
          `/tmp/${id}-local.wav`,
        ])
          .then((data) => {
            callback(null, data);
          })
          .catch((err) => {
            callback(err)
            console.log(err);
          });
    })
    .catch(err => console.error(err))
}
