module.exports = function(io) {
        console.log("Configure io");
        io.on('connection', function(socket){
        	var clientIp = socket.request.connection.remoteAddress;
        	var clientPort = socket.request.connection.remotePort;
        	var room = '';

        	console.log("Socket connection from: " + clientIp + ":" + clientPort);

        	socket.on('msg', function(msg){
        		io.sockets.emit('msg', msg);
        		console.log(clientIp + ': Room: ' + room + ": MSG: " + msg);
        	});

                socket.on('liveType', function(data){
        		io.sockets.emit('liveType', data);
        	});

                socket.on('disconnect', function(socket){
                        console.log("Disconnect");
                });

        });
}
