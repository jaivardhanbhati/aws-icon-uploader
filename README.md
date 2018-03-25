# Generic file-uploader to Amazon Cloud - s3 Bucket

A simple Node.js application illustrating usage of the AWS SDK + Node.js.

## Requirements

The only requirement of this application is the Node Package Manager. All other
dependencies (including the AWS SDK for Node.js) can be installed with:

    npm install

## Basic Configuration

You need to set up your AWS security credentials in config.json to be able to connect 
to your S3 instance on AWS. 

    [default]
    aws_access_key_id = <your access key id>
    aws_secret_access_key = <your secret key>
    aws_s3_bucket_region = <eg. us-east , us-west>

See the [Security Credentials](http://aws.amazon.com/security-credentials) page.
See the AWS SDK for Node.js [Developer Guide](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
for more information.

## Running the S3 sample

This sample service connects to Amazon's [Simple Storage Service (S3)](http://aws.amazon.com/s3) using the credentials,
given under config.json .The script will automatically :
- create a S3 bucket under default name if no servicename is provided else will create a bucketname with your servicename, 
- uploads the file to that S3 bucket. 

All you need to do is run it:

    node app.js --file[required] --servicename[optional]

The S3 documentation has a good overview of the [restrictions for bucket names](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html)
for when you start making your own buckets.

## License

This sample application is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

