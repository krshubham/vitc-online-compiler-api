function compiler(req,res,next){
    console.log('Done with callling the compile function');
    return next();
}


export default compiler;