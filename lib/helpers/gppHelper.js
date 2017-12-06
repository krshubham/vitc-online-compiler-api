import {executeCodeWithoutTestCases, executeCodeWithTestCases } from './codeRunner'

function gppHelper(req,res,next){
  /**
   * code {String} - String containing the source code of the program to be compiled and run
   * testCase {Array<String>} - Containing test cases as array of strings
   * stdinRequired {Boolean} - Boolean stating whether testcases are required for this code or not.
   */
  let code = req.body.code;
  let testCases = req.body.test_cases;
  let stdinRequired = req.body.stdin_required;
  let resultsPromiseArray = [];
  if(stdinRequired){
    for(let testcase of testCases){
      resultsArray.push(
        executeCodeWithTestCases(code,testCase, 'c_cpp')
      );
    }
    Promise.all(resultsPromiseArray)
    .then(
      (resultsArray) => {
        res.send(resultsPromiseArray);
      }
    )
    .catch((err) => {
      res.send(520,{
        type: 'ExecutionEnvError',
        message: 'The server was unable to run the code.'
      });
    });
  }
  else{
    executeCodeWithoutTestCases(code)
    .then(
      (executionResult) => {
        let tempArr = [];
        tempArr.push(executionResult);
        res.send(tempArr);
      }
    )
    .catch(
      (err) => {
        res.send(520, {
          type: 'ExecutionEnvError',
          message: 'The server was unable to run the code.'
        });
      }
    );
  }
}

export default gppHelper;
