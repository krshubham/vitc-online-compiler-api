/**
* @author Kumar Shubham
* This module calls the corresponding compiling module based on the
* language of the input code
*/
import * as assert from 'assert';
import Runner from './runner';

const supportedLanguages = ['c++','c','java','python2','python3'];

/**
 * In the future when we need to support newer languages we can make changes here
* Passes the request to the corresponding compiler
* @param {*} req restify request object
* @param {*} res restify response object
* @param {*} next restify next handler
*/
function compiler(req,res,next){
  /**
   * Now the request object must contain these properties:
   * @prop {String} language the language of the source code
   * @prop {String} stdin the standard input given to the source file (Optional)
   * @prop {Number} timeout_value The timeout for the given source code file (Optional)
   * @prop {String} code The source code of the program to be compiled
   */
  let language = req.body.language,
    stdin = req.body.stdin || '', // blank stdin can also be present
    timeoutValue = req.body.timeout_value || 5, // in seconds (default timeout value is 5 seconds)
    code = req.body.code;
  try{
    assert.notEqual(supportedLanguages.indexOf(language),-1);
    assert.equal(true, req.body.hasOwnProperty('language'));
    assert.equal(true, req.body.hasOwnProperty('code'));
  }
  catch(requestErrors){
    console.log(requestErrors);
    console.log("error occured");
    res.status(400);
    return res.json({
      type: 'RequestError',
      message: 'The request was not formatted properly',
      info: JSON.stringify(requestErrors)
    });
    next();
  }
  //call the runner method and get the value of the output object
  let runner = new Runner(language,timeoutValue,code,stdin);
  runner.execute()
  // .then((outputData) => {
  //   console.log(outputData);
  // })
  // .catch(err => console.log(err));
}

export default compiler;