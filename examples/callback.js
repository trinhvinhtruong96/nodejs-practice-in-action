exports.parseReceivedData = function (req, cb) {
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) { body += chunk });
  req.on('end', function () {
    var data = qs.parse(body);
    cb(data);
  });
};