function python2Helper(req,res,next){
    res.send('Welcome to the python 2 helper sandbox');
    return next();
}

export default python2Helper;