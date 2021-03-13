'use strict';
const http = require('http');
const express = require('express');
const { createTerminus } = require('@godaddy/terminus');
const app = module.exports = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./config/environment')(app);
require('./config/routes')(app);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(200).json({status: "error", "message": { data: err.message }})
});

const server = http.createServer(app);

function onSignal () {
  console.log('server is starting cleanup')
  // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck () {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
  console.log('Health Check called')
  res.status(200).json({status: "UP"});
}

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal
});


server.listen(3000);