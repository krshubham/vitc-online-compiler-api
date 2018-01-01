const Docker = require('dockerode');
const path = require('path');
const fs = require('fs');

let docker = new Docker();

docker.createContainer({
  Image: 'coderunnerimage',
  Cmd: ['/bin/bash','-c',`g++ -std=c++14 code/test.cpp && time ./a.out < ./code/in > ./code/out`],
  Volumes: {
    '/home/code': {}
  },
  HostConfig: {
    Binds : ['/Users/ks/work/Git-projects/vitc-online-compiler-api/test/code:/home/code:rw'],
    NetworkDisabled: true,
    RW: true
  },
  Resources: {
    Limits: {
      MemoryBytes: 256000000
    }
  }
}, function(err, container) {
  container.attach({
    stream: true,
    stdout: true,
    stderr: true,
    tty: true
  }, function(err, stream) {
    stream.pipe(process.stdout);
    container.start((err, data) => { 
      container.stop()
      .then(() => {return container.remove()})
      .then((data) => {
        console.log('Container removed');
      })
      .catch(err => console.log(err));
    })
  });
});
