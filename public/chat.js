//Make connection

var socket=io.connect("http://localhost:4000");

//Query Dom

var message=document.getElementById('message');
    btn=document.getElementById('send'),
    handle=document.getElementById('handle'),
	feedback=document.getElementById("feedback");
    
//Event Emitter
  btn.addEventListener('click',function(){
	  var name=$("#user-name").val();
	 console.log('made socket connection1',name.value);
	 console.log('made socket connection2',message.value);
	socket.emit('chat',{
		message:message.value,
		name:name
	});  
  });

  message.addEventListener('keypress',function(){
	  var name=$("#user-name").val()
	  var user=(name)?name:"testUser"
	  socket.emit('typing',user);
  })
  
  //Event listener
  
  socket.on('chat',function(data){
	  $("#user-name").val("");
	  $("#message").val("");
	  $("#feedback").html("")
	  var user=(data.name)?data.name:"testUser"
	  $(".messages-content").append("<p><strong>"+user+"</strong>: "+data.message +"</p></br>"); 
	  
	  /* function reply(){
		  $(".messages-content").append(output+" :"+data.reply +"</br>")
	  }
	  setTimeout(function(){
		  reply()
	  },1000); */
	  
  })
  
  socket.on('typing',function(data){
	  $("#feedback").html("<p><em>"+data+"</em> is typing</p>");
  })