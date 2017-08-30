var express=require('express')
var socket=require('socket.io');

//App Setup

var app=express();
var server=app.listen(4000,function(){
	console.log('listening to port 4000');
})

//Static files

app.use(express.static('public'));

//Socket setup

var io=socket(server);

io.on('connection',function(socket){
	console.log('made socket connection',socket.id);
	
	socket.on('chat',function(data){

		if(data.message.trim().toLowerCase()=="hi"){
			data.reply="Hi How are you dude ?";
		}
		io.sockets.emit('chat',data)
	})
	
	socket.on('typing',function(data){
		console.log("data",data);
		socket.broadcast.emit('typing',data);
	})
})

