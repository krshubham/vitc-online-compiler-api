import dockerHelper from "./dockerHelper";

function gppHelper(req,res,next){
  let dockerPromise = new dockerHelper('c_cpp');
  dockerPromise.then((docker) => {
    docker.start()
        .then((container) => {
            console.log(container);
        });
        res.json({
	    data: 'container'
        });
        return next();
    });
}

export default gppHelper;
