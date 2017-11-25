function gppHelper(req,res,next){
    res.send('Welcome to the c/c++ compiler sandbox');
    return next();
}

export default gppHelper;