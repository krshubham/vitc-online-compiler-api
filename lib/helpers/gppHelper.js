import dockerHelper from "./dockerHelper";

function runExec(req,container) {
  
  var options = {
    Cmd: ['bash','-c',`cd /home && mkdir test && cd test/ && echo "${req.body.code}">test.cpp && g++ test.cpp && ./a.out`],
    AttachStdout: true,
    AttachStderr: true,
    AttachStdin: true
  };
  
  container.exec(options, function(err, exec) {
    if (err) return;
    exec.start(function(err, stream) {
      if (err) return;
      
      container.modem.demuxStream(stream, process.stdout, process.stderr);
      
      exec.inspect(function(err, data) {
        if (err) return;
        console.log(data);
        return container;
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
