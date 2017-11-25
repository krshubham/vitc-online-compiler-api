require('source-map-support').install();

import restify from 'restify';
import bodyParser from 'body-parser';
import router from './router';
import * as config from '../config/server.json';
const server = restify.createServer();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

router(server);

server.listen(config.port, () => {
    console.log(`server is running on ${server.url}`);
});