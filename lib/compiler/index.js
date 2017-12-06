/**
* @author Kumar Shubham
* This module calls the corresponding compiling module based on the
* language of the input code
*/
import gpp from '../helpers/gppHelper';
import javac from '../helpers/javacHelper';
import python2 from '../helpers/python2Helper';
import python3 from '../helpers/python3Helper';


/**
 * In the future when we need to support newer languages we can make changes here
* Passes the request to the corresponding compiler
* @param {*} req restify request object
* @param {*} res restify response object
* @param {*} next restify next handler
*/
function compiler(req,res,next){
  switch(req.body.lang){
    case 'c_cpp':
    gpp(req,res,next);
    break;
    case 'java':
    javac(req,res,next);
    break;
    case 'pyth2':
    python2(req,res,next);
    break;
    case 'pyth3':
    python3(req,res,next);
    break;
    default:
    res.send('The request is not in the correct format');
    return next();
    break;
  }
}

export default compiler;