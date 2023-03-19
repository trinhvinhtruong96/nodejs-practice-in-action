//  cookieParser()—Parses cookies from web browsers into req.cookies
//  bodyParser()—Consumes and parses the request body into req.body
//  limit()—Goes hand in hand with bodyParser() to keep requests from getting
// too big
//  query()—Parses the request URL query string into req.query

// the secret is tobi is a cool ferret
// cookie can be signed or unsigned and can be json (signed or unsigned)
var connect = require('connect');
var app = connect()
  .use(connect.cookieParser('tobi is a cool ferret'))
  .use(function (req, res) {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('hello\n');
  }).listen(3000);

// cookie outgoing
var connect = require('connect');
var app = connect()
  .use(function (req, res) {
    res.setHeader('Set-Cookie', 'foo=bar');
    res.setHeader('Set-Cookie', 'tobi=ferret;
 ➥Expires = Tue, 08 Jun 2021 10: 18: 14 GMT');
res.end();
}).listen(3000);

// dynamic limits
function type(type, fn) {
  return function (req, res, next) {
    var ct = req.headers['content-type'] || '';
    if (0 != ct.indexOf(type)) {
      return next();
    }
    fn(req, res, next);
  }
}
var app = connect()
  .use(type('application/x-www-form-urlencoded', connect.limit('64kb')))
  .use(type('application/json', connect.limit('32kb')))
  .use(type('image', connect.limit('2mb')))
  .use(type('video', connect.limit('300mb')))
  .use(connect.bodyParser())
  .use(hello);