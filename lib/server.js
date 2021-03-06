require('source-map-support').install();
require("nice-console")(console);
import restify from 'restify';
import bodyParser from 'body-parser';
import router from './router';
import * as config from '../config/server.json';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
const server = restify.createServer();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//setting up the logger
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'), {
    flags: 'a'
  }
);
/**
* Necessary logging middleware
*/
server.use(morgan('combined', {stream: accessLogStream}));

//routes
router(server);

server.listen(config.port, () => {
  console.log(`server is running on ${server.url}`);
});


server.on('uncaughtException', function(req, res, route, err) {
  console.log(err);
  res.send('Some bad thing has occured with this request');
});