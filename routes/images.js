var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var helpers = require('../helpers/helpers.js')
var fs = require('fs');
var bucketName = process.env.BUCKET

/* GET images listing. */
router.get('/', function(req, res, next) {
  var images = helpers.getImagesFromS3();
  images.then(function(data) {
    console.log(data);
    res.render('images', { title: 'list of images', 
                          images: data.Contents, 
                          bucket: bucketName,
                          awsBucketDomain: 's3.amazonaws.com'});
  });
});

router.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = process.cwd() + '/public/images/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        helpers.uploadToS3(file);
        fs.unlinkSync(file.path);
    });

    form.on('end', function() {
      res.redirect('/images')
    });

});

module.exports = router;
