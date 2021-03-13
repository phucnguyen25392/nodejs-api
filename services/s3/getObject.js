const AWS = require('aws-sdk');
//AWS.config.update({region:'eu-central-1'});
const to = require('await-to-js').default;
var s3 = new AWS.S3();

module.exports = (async function (object) {

    var params = {
        Bucket: "realjenkins",
        Key: `${object}`
    };

    return [err, data] = await to(s3.getObject(params).promise());
});