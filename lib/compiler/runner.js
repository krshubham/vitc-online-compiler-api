import fs from 'fs';
import path from 'path';
import Docker from 'dockerode';
import extensionMap from '../constants/extensionMapper';
import assert from 'assert';
import cuid from 'cuid';

class Runner{
  /**
  * @param {String} language Allowed options are: c++,c,java,python2,python3
  * @param {Number} timeout
  * @param {String} code
  * @param {String} stdin standard input
  */
  constructor(language, timeout,code, stdin){
    this.language = language,
    this.timeout = timeout,
    this.code = code,
    this.stdin = stdin;
  }
  
  
  prepare(){
    return new Promise((resolve,reject) => {
      try{
        let extension = '';
        extension = extensionMap[String(this.language)];
        assert.notEqual(extension,'');
        this.fileName = `${cuid.slug()}.${extension}`;
        fs.writeFile(path.join(__dirname,`../../usercode/${this.fileName}`),this.code,(err) => {
          assert.equal(err,null);
          console.log('Source code file written');
          resolve(`${this.fileName}`);
        });
      }
      catch(err){
        reject(err);
      }
    });
  }
  
  execute(){
    let self = this;
    this.prepare()
    .then((fileName) => {
      try{
        let docker = new Docker();
        docker.createContainer({
          Image: 'coderunnerimage',
          Cmd: ['/bin/bash','-c',`g++ -std=c++14 code/${fileName} && time ./a.out < ./code/in > ./code/out`],
          // Cmd: ['/bin/bash','-c',`time python3 code/${fileName} < ./code/in > ./code/out`],
          Volumes: {
            '/home/code': {}
          },
          HostConfig: {
            //Mount the file here with read write permissions
            Binds : ['/Users/ks/work/Git-projects/vitc-online-compiler-api/usercode:/home/code:rw'],
            NetworkDisabled: true,
          },
          Resources: {
            Limits: {
              MemoryBytes: 2560000
            }
          }
        }, function(err, container) {
          container.attach({
            stream: true,
            stdout: true,
            stderr: true,
            tty: true
          }, function(err, stream) {
            stream.pipe(process.stdout);
            container.start((err, data) => { 
              container.stop()
              .then(() => {return container.remove()})
              .then((data) => {
                fs.unlinkSync(path.join(__dirname,`../../usercode/${self.fileName}`));
                console.log('Container removed');
              })
              .catch(err => console.log(err));
            })
          });
        });
      }
      catch(dockerError){
        //now log with timestamp
        console.log('Possible Docker Error occured');
        res.status(500);
        return res.json({
          type: 'InternalServerError',
          message: 'The server encountered an error while processing your request, please try after some type'
        });
      }
    })
    .catch(err => console.log(err));
  }
}

export default Runner;