import Docker from 'dockerode';


/**
* Creates a new docker container for running the code in the sandbox
* @returns {Promise}
*/
function makeNewContainer(){
    console.log("creating a new docker container");
    new Docker.createContainer({
        Image: 'glot/clang',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
        OpenStdin: false,
        StdinOnce: false
    })
    .then((container) => {
        console.log('Done creating the container');
        console.log(container);
    })
    .catch(err => console.log(err));
}

makeNewContainer();

export default {
    makeNewContainer
};