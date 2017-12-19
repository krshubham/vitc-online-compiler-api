import * as Docker  from 'dockerode';
import { imageName } from "./images";
import crypto from 'crypto';

class Runner{
  /**
   * @param {String} language Allowed options are: c++,c,java,python2,python3
   * @param {Number|Seconds} timeout 
   * @param {String} code 
   * @param {String} stdin
   */
  constructor(language, timeout,code, stdin){
    this.language = language,
    this.timeout = timeout,
    this.code = code,
    this.stdin = stdin;
  }

  generateFileName(){
    return crypto.randomBytes(10).toString('hex');
  }

  /**
   * 
   * @param {String} fileName the fileName of the source file
   */
  commands(fileName){
    let commandArr = [];
    if(this.language === 'c++'){
      commandArr = ['g++ -wo ',`${fileName}.cpp`,'&&',`./${filename}`];
    }
    else if(this.language === 'c'){
      commandArr = ['gcc -wo ',`${fileName}.c`,'&&',`./${filename}`];
    }
    else if(this.language === 'java'){
      commandArr = ['javac Main.java && java Main'];
    }
    else if(this.language === 'python2'){
      commandArr = ['python',`${fileName}.py`];
    }
    else if(this.language === 'python3'){
      commandArr = ['python3 ',`${fileName}.py`]
    };
    return commandArr;
  }


  execute(){
    //this is the method where all the code execution will happen
    let docker = new Docker();
    let image = imageName[this.language];
    let fileName = this.generateFileName();
    let commandArr = this.commands(fileName);
    if(commandArr.length)
  }
};

export default Runner;