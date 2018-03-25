let AWS = require('aws-sdk');
let fs = require('fs');
let path = require('path');
const args = require('yargs').argv;

console.log('file: ' + args.file);
console.log('service-name: ' + args.servicename);

//Initializing AWS S3 Config
AWS.config.loadFromPath('./config.json');

let s3 = new AWS.S3();


/*
If servicename provided - bucketname = {servicename}.cloud.vmware.com
else Default bucketname = console.cloud.vmware.com
 */
let bucketname = (args.servicename) ? args.servicename +'.cloud.vmware.com' : 'console.cloud.vmware.com';
let bucketParams = {Bucket: bucketname};

s3.waitFor('bucketNotExists', bucketParams, function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log('Bucket does not exist');
        s3.createBucket(bucketParams,function(err,data) {
            if (err) {
                console.log(err, err.stack);
            } // an error occurred
            else {
                bucketname = data.Location.slice(1,data.Location.length-1);
                console.log(bucketname);
                uplaodIcon(bucketname);
            }
        });
    }
});

s3.waitFor('bucketExists', bucketParams, function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        uplaodIcon(bucketname)
    }
});


function uplaodIcon(bucketname) {

    fs.readFile(args.file, function (err, data) {
        if (err) { throw err; }

        let base64data = new Buffer(data, 'binary');

        s3.putObject({
            Bucket: bucketname,
            Key:  path.basename(args.file),
            Body: base64data,
            ACL: 'public-read'
        },function (err, data) {
            if (err) { throw err; }
            else {
                returnIconUrl();
                console.log('arguments',arguments);
                console.log('Successfully uploaded package.');
            }
        });
    });
}

function returnIconUrl() {
    var urlParams = {Bucket: bucketname, Key: path.basename(args.file)};
    s3.getSignedUrl('getObject', urlParams, function(err, url) {
        if(!err) {
            console.log('the url of the image is', url.split('?')[0]);
        }
    });
}
