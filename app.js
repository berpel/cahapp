
/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , webRTC = require('webrtc.io').listen(8001);

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.bodyParser())
app.use(stylus.middleware(
  { src: __dirname + '/public', compile: compile}
))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index', {
    title: 'cah',
  });
});

app.listen(3000);