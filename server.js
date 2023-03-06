var http = require('http')
var server = http.createServer(function (req, res) {
  req.on('data', function (chunk) {
    console.log('parsed', chunk);
  });
  req.on('end', function () {
    console.log('done parsing');
    res.end()
  });
});