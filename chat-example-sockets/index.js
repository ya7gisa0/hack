// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

io.sockets.on('connection', function(socket) {
	socket.on('chat message', function(data) {
		console.log(data);
		var r = parseInt(Math.random()*255);
		var g = parseInt(Math.random()*255);
		var b = parseInt(Math.random()*255);
		io.sockets.emit('chat massage from server', 'from server' + data, r, g, b);
	});
})

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
