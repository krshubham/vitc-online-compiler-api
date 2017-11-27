import dockerHelper from "./dockerHelper";

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



function gppHelper(req,res,next){
  let dockerPromise = new dockerHelper('c_cpp');
  dockerPromise.then((docker) => {
    docker.start()
    .then((container) => {
      runExec(container);
    });
    res.json({
      data: 'container'
    });
    return next();
  });
}

export default gppHelper;
