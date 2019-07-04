var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('offer', function(msg){
        console.log('offer:', msg)
        socket.broadcast.emit('offer', msg);
    });
    socket.on('answer', function(msg){
        console.log('answer:', msg)
        socket.broadcast.emit('answer', msg);
    });
    socket.on('candidate', function(msg){
        console.log('candidate:', msg)
        socket.broadcast.emit('candidate', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});