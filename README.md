# upload-image-to-s3-web-server

This repository is the web server part of a poc for resizing images using lambda.

## Spec
It's written in node js and uses express. The templating is done with Jade.

## Pages
1. index - where images are uploaded.
2. /images - where images can be viewed. The images are taken from a public-read S3 that is created using cloudformation template.
See this repo for more information.
3. /images/upload - an endpoint accessible through post request to upload images to S3.

## How to run
The webserver is not a standalone. It's supposed to be used in conjunction with another repo that contains the cloudfomration
template and the lambda function for resizing images. When you deploy the cloudformation and lambda, simply specify the repo
in the cloud formation parameter section.
