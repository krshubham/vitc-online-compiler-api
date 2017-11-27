import dockerHelper from "./dockerHelper";

function runExec(req,container) {
  
  var options = {
    Cmd: [`cd /home && echo ${req.body.code}>test.cpp && g++ test.cpp && ./a.out`],
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
