var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');
var address = 'localhost';
var port = 8080;


var server = new WebpackDevServer(webpack(config),
  {
    https: false,
    hot: true
  });

// Important part. Send down index.html for all requests
server.use('/', function(req, res) {

  const extension = path.extname(req.originalUrl).toLowerCase();
  switch(extension) {
    case '.map':
    case '.js':
    case '.css':
    case '.html':
      // Proceed as normal
      // FYI, this is not an exhaustive list
      // console.log('Proceeding as normal from extension: ' + extension);
      break;
    case '.ico':
      res.sendFile(path.join(__dirname, 'favicon.ico'));
      break;
    case '.woff':
      res.sendFile(path.join(__dirname, 'src/view/style/bootstrap/fonts/glyphicons-halflings-regular.woff'));
      break;
    case '.woff2':
      res.sendFile(path.join(__dirname, 'src/view/style/bootstrap/fonts/glyphicons-halflings-regular.woff2'));
      break;
    default:
      // Render index.html, this is for the client side routing
      // necessary in an SPA
      // console.log('Sending to index.html from extension: ' + extension);
      res.sendFile(path.join(__dirname + '/index.html'));
  }

});

server.listen(port, address, function (err) {
    if (err) {
        console.log(err);
    }
    else {
      console.log('Listening at ' + address + ':' + port);
    }
});
