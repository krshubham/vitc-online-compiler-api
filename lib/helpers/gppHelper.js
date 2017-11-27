import dockerHelper from "./dockerHelper";

function runExec(req,container) {
  
  var options = {
    Cmd: ['bash','-c',`cd /home && mkdir test && cd test/ && echo ${req.body.code}>test.cpp && g++ test.cpp && ./a.out`],
    AttachStdout: true,
    AttachStderr: true,
    AttachStdin: true
  };
  
  container.exec(options, function(err, exec) {
    return new Promise((resolve,reject) => {
      if (err) reject(err);
      exec.start(function(err, stream) {
        if (err) reject(err);
        container.modem.demuxStream(stream, process.stdout, process.stderr);
        resolve(container);
      });
    });
  })
  .then((container) => {
    return container.stop();
  })
  .then((container) => {
    return container.remove();
  })
  .then((data) => {
    console.log('Container removed');
  })
  .catch(err => console.log(err));
}



function gppHelper(req,res,next){
  let dockerPromise = new dockerHelper('c_cpp');
  dockerPromise.then((docker) => {
    docker.start()
    .then((container) => {
      runExec(req,container);
    })
    .catch((err) => {
      console.log(err);
    })
    res.json({
      data: 'container'
    });
    return next();
  });
}

export default gppHelper;
