import Docker from 'dockerode';
import assert from 'assert';

/**
* Creates a new docker container for running the code in the sandbox
* @returns {Promise}
*/
function makeNewContainer(){
  let docker = new Docker();
  docker.pull('glot/python:latest', (err, stream) => {
    assert.equal(err,null);
    stream.on('data', (chunk) => {
      console.log(chunk.toString('utf-8'));
    });
    stream.on('end', () => {
      console.log('The stream has ended');
    })
  });
}

makeNewContainer();

export default {
  makeNewContainer
};