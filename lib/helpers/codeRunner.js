/**
 * There has to be a default time limit for all the questions,which will be set in a
 * config file.
 */

import Docker from 'dockerode';
import images from '../constants/images';

const dockerContainerMapping = {
  'c_cpp': 'GPP',
  'java': 'JAVAC',
  'pyth2': 'PYTHON2',
  'pyth3': 'PYTHON3'
};

/**
 * Takes the code and runs it again the given test case and returns the result object
 * @param {String} code 
 * @param {String} testCase 
 * @param {String} language 
 * @returns {ResultObject}
 */
function executeCodeWithTestCases(code,testCase,language){
  let imageToRun = images[dockerContainerMapping[language]];
  console.log(imageToRun);
  let docker = new Docker();
}

/**
 * Runs the code and returns the results. No testcases provided.
 * @param {String} code 
 * @param {String} language 
 */
function executeCodeWithoutTestCases(code,language){

}

export {
  executeCodeWithoutTestCases,
  executeCodeWithTestCases
};