var connect = require('connect')
var url = require('url')
var app = connect()
  .use(rewrite)
  .use(showPost)
  .listen(3000)

function rewrite(req, res, next) {
  var match = path.match(/^\/blog\/posts\/(.+)/)
  if (match) {
    findPostIdBySlug(match[1], function (err, id) {
      if (err) return next(err);
      if (!id) return next(new Error('User not found'));
      req.url = '/blog/posts/' + id;
      next();
    });
  } else {
    next();
  }
}