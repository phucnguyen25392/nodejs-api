'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (app, express) {
  fs.readdirSync('C:\\Users\\Phuc Nguyen\\local\\scratch\\learning\\controller').forEach(function (file) {
    // Avoid to read this current file.
    if (file === path.basename(__filename)) { return; }

    // Load the route file.
    require(`../controller/${file}`)(app);
  });
};