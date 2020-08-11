const express = require('express');
const fs = require('fs');
const path = require('path');

const VAST = require('vast-client');
const VASTClient = VAST.VASTClient;
const vastClient = new VASTClient();

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3001

app.listen(PORT, function() {
  console.log(`server start at ${PORT}`);
})

app.get('/watch', function(req, res) {
  vastClient.get('http://localhost:8000/vast/sample_creative.xml')
  .then(vastData => {
    // Do something with the parsed VAST response
    console.log(vastData)

    var ad = vastData.ads[0]
    var creative = ad.creatives[0];
    var mediaFiles = creative.mediaFiles;
    var mediaFile = mediaFiles[0]


    var params = {
    };
  
    params.title = ad.title;
    params.width = mediaFile.width;
    params.height = mediaFile.height;
    params.src = mediaFile.fileURL;
    params.type = mediaFile.mimeType;
    
    console.log('params:', params)

    res.render('watch', params);
  })
  .catch(err => {
    // Deal with the error
    console.log(err)
  });
})