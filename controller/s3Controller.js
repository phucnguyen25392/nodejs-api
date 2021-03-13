'use strict';
const { check,validationResult } = require('express-validator');
const validateRequest = require('../services/utils/validator');
const to = require('await-to-js').default;
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

async function retrieveFile(req, res, next) {
    validateRequest(validationResult, req, res);

    var params = {
        Bucket: "realjenkins",
        Key: req.query.filepath
    };

    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
}


module.exports = function (app) {
    app.get ('/s3/getobject', [
            check('filePath').exists().isString()
        ]
        , retrieveFile);

};