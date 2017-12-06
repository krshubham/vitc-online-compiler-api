import Docker from 'dockerode';
import assert from 'assert';
import images from '../constants/images';

class dockerHelper {
  /**
  * language is the language in which the source code is sent to the proxy server
  * @param {String} language 
  */
  constructor(language){
    //make the language accessible to this class objects
    this.language = language;
    return this.makeNewContainer();
  }
  
  /**
  * Returns the name of the image for the given language.
  * The name is taken from the contants array defined in ../constants/images
  * @param {String} language 
  */
  findImageName(language){
    let image = null;
    /**
    * Find the appropriate image for the given language
    */
    switch(language){
      case 'c_cpp':
      image = images.GPP;
      break;
      case 'java':
      image = images.JAVAC;
      break;
      case 'pyth2':
      image = images.PYTHON2;
      break;
      case 'pyth3':
      image = images.PYTHON3;
      break;
      default:
      return new Error({
        type: 'LangError',
        message: 'Incorrect language specified'
      });
    }
    return image;
    
  }
  
  
}

export default dockerHelper;
