import Docker from 'dockerode';
import stream from 'stream';

export default class Dockaless {
  constructor(dockerOpts) {
    const file = '/tmp/mylogs.txt';
    this.docker = new Docker(dockerOpts);
    this.logStream = new stream.PassThrough();
  }

  create(image, cmd) {
    const startOptions = {
      'Hostconfig': {
        'Binds': ['/tmp:/tmp']
      }
    };

    return new Promise((resolve, reject) => {
      let dataString;

      this.logStream.on('data', (data) => {
        dataString += data.toString();
      });

      this.logStream.on('error', (data) => {
        if (err) { return reject(err); }
      });

      this.logStream.on('end', () => {
        return resolve(dataString);
      });

      this.docker.run(image, cmd, this.logStream, startOptions)
    });
  }
}
