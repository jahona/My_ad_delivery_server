const express = require('express');
const fs = require('fs');
const url = require('url');

const app = express()

app.use(express.static('public'));

const PORT = process.env.PORT || 8000

/*
https://javafa.gitbooks.io/nodejs_server_basic/content/chapter11.html
*/

app.listen(PORT, function() {
  console.log(`server start at ${PORT}`);
})

app.get('/ads/*.mp4', function(req, res) {
  var parseUrl = url.parse(req.url)
  var resource = parseUrl.pathname
  console.log('resource=' + resource)

  var resourcePath = '.' + resource
  console.log('resourcePath=' + resourcePath)

  var stream = fs.createReadStream(resourcePath)

  // chunk count
  var count = 0

  stream.on('data', function(data) {
    count++;

    //console.log('data count=', count)
    console.log(`data count=${count}, data=${data.length}`)
    
    res.write(data)
  })

  stream.on('end', function() {
    console.log('end streaming');

    res.end();
  })

  stream.on('error', function(err) {
    console.log(err);

    res.end('500 Internal Server '+ err)
  })
})

app.get('/vast/*', function(req, res) {
  var parseUrl = url.parse(req.url)
  var resource = parseUrl.pathname
  console.log('resource=' + resource)

  var resourcePath = '.' + resource
  console.log('resourcePath=' + resourcePath)

  fs.readFile(resourcePath, 'utf-8', function(err, data) {
    if(err) {
      res.writeHead(500, {
        'Content-Type':'text/html'
      })
      res.end('Internal Server '+ err)
    } else {
      res.writeHead(200, {
        'Content-Type':'text/html'
      })
      res.end(data)
    }
  })
})

app.get('/track/impression', function(req, res) {
  console.log('/track/impression')

  res.end('/track/impression')
})