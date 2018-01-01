var Docker = require('dockerode');

var docker = new Docker();

/**
 * Get env list from running container
 * @param container
 */
function runExec(container) {

  var options = {
    Cmd: ['bash', '-c', 'echo test $VAR'],
    Env: ['VAR=ttslkfjsdalkfj'],
    AttachStdout: true,
    AttachStderr: true
  };

  container.exec(options, function(err, exec) {
    if (err) return;
    exec.start(function(err, stream) {
      if (err) return;

      container.modem.demuxStream(stream, process.stdout, process.stderr);

      exec.inspect(function(err, data) {
        if (err) return;
        console.log(data);
      });
    });
  });
}

docker.createContainer({
  Image: 'coderunnerimage',
  Tty: true,
  Cmd: ['/bin/bash']
}, function(err, container) {
  container.start({}, function(err, data) {
    runExec(container);
  });
});