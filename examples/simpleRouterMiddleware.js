// routing
var connect = require('connect');
var router = require('./middleware/router');
var routes = {
  GET: {
    '/users': function (req, res) {
      res.end('tobi, loki, ferret');
    },
    '/user/:id': function (req, res, id) {
      res.end('user ' + id);
    }
  },
  DELETE: {
    '/user/:id': function (req, res, id) {
      res.end('deleted user ' + id);
    }
  }
};
connect()
  .use(router(routes))
  .listen(3000);

// Routing with file organization 
var connect = require('connect');
var router = require('./middleware/router');
connect()
  .use(router(require('./routes/user')))
  .use(router(require('./routes/admin')))
  .listen(3000);

// configurable
var parse = require('url').parse;
module.exports = function route(obj) {
  return function (req, res, next) {
    if (!obj[req.method]) {
      next();
      return;
    }
    var routes = obj[req.method]
    var url = parse(req.url)
    var paths = Object.keys(routes)
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var fn = routes[path];
      path = path
        .replace(/\//g, '\\/')
        .replace(/:(\w+)/g, '([^\\/]+)');
      var re = new RegExp('^' + path + '$');
      var captures = url.pathname.match(re)
      if (captures) {
        var args = [req, res].concat(captures.slice(1));
        fn.apply(null, args);
        return;
      }
    }
    next();
  }
};