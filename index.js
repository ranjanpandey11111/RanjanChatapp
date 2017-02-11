var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/chat", function(err, db) {
  if(err) {console.log("not connedet");} 
  return db;
 });   

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get('/', function(req, res){//console.log(req.body)
  //res.sendFile(__dirname + '/login.ejs')
  res.render('login',{msg: "Lgin"});
  //res.sendFile(__dirname + '/index.html');
});
app.post('/login', function(req, res){//console.log(req.body.user)
  //res.sendFile(__dirname + '/login.html')
  var db=MongoClient.connect("mongodb://localhost:27017/chat", function(err, db) {
  if(err) {console.log("not connedet");} 
  var collection=db.collection('users');
	collection.find({namwe: req.body.user}).toArray(function(err, items) {console.log(items.length)
            if(err){console.log("error")}
			if(items.length===0){res.render('login',{msg: "Wrong User"})}
			else{res.render('index',{msg: "Welcome MR"+ ' ' + req.body.user})}
                        
        });
 });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});