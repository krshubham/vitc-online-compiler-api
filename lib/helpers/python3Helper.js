function python3Helper(req,res,next){
    res.send('Welcome to the pyhton 3 sandbox helper');
    return next();
}


export default python3Helper;