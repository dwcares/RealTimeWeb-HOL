var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});