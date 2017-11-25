function javacHelper(req,res,next){
    res.send('Welcome to the java compiler sandbox');
    return next();
}

export default javacHelper;