import Docker from 'dockerode';


/**
 * Creates a new docker container for running the code in the sandbox
 * @returns {Promise}
 */
function makeNewContainer(){
    return new Docker({
        Cmd: '/bin/bash',
        OpenStdin: true,
        Tty: true
    });
}


export default {
    makeNewContainer
};