var aws = require('aws-sdk');
var fs = require('fs');
var s3 = new aws.S3();

module.exports = {
    uploadToS3: function(file) {
        
        var params = {
            Body: fs.readFileSync(file.path),
            Bucket: process.env.BUCKET, 
            Key: file.name
        };

        s3.putObject(params, function(err, data){
            if (err) {
                console.log(err);
            } else {
                console.log(data);  
            }
        });
    },

    getImagesFromS3: function() {
        return new Promise(function(resolve, reject) {
            var params = {
                Bucket: process.env.BUCKET
            }
            s3.listObjects(params, function(err, data){
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

    
  
    }
}