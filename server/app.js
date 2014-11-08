'use strict';
var express = require('express'),
    gzippo = require('gzippo'),
    compression = require('compression');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());

app.get('/api', function(req, res){
    res.send('hey there');
});

//angular server
app.use('/scripts', gzippo.staticGzip(__dirname + '/../dist/scripts'));
app.use('/images', gzippo.staticGzip(__dirname + '/../dist/images'));
app.use('/styles', gzippo.staticGzip(__dirname + '/../dist/styles'));
app.use('/views', gzippo.staticGzip(__dirname + '/../dist/views'));
app.all('/*', function(req, res) {
  res.sendFile('index.html', {root: __dirname + '/../dist'});
});  

app.listen(app.get('port'));
console.log('api server listening on ' + app.get('port'));
console.log(process.env.SECRET);