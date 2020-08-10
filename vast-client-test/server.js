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

const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
  console.log(`server start at ${PORT}`);
})

app.get('/watch', function(req, res) {
  vastClient.get('http://localhost:8000/video/vast_example.xml')
  .then(res => {
    // Do something with the parsed VAST response
    console.log(res)

    var params = {
    };
  
    params.title = 'test';
    params.width = '300';
    params.height = '200';
    params.src = 'src';
    params.type = 'video/mp4';
  
    res.render('watch', params);
  })
  .catch(err => {
    // Deal with the error
    console.log(err)
  });
})