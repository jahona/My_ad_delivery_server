const VAST = require('vast-client');
const VASTClient = VAST.VASTClient;
const vastClient = new VASTClient();

vastClient.get('http://localhost:8000/video/vast_example.xml')
  .then(res => {
    // Do something with the parsed VAST response
    console.log(res)

    var creative = res.ads[0].creatives;

    console.log(creative)

    var mediaFiles = creative[0].mediaFiles;

    console.log(mediaFiles)

    // fileURL
    // width
    // height
    // mimeType
  })
  .catch(err => {
    // Deal with the error
    console.log(err)
  });