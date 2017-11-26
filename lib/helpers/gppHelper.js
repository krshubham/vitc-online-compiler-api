import dockerHelper from "./dockerHelper";

function gppHelper(req,res,next){
  let dockerPromise = new dockerHelper('c_cpp');
  dockerPromise.then((docker) => {
    console.log(docker);
    let opts = [];
    for(let i in docker){
      opts.push(i);
    }
    res.json({
      data: opts
    });
    return next();
  })
}

export default gppHelper;