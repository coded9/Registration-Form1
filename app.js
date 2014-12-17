var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Environments
app.set('port',process.env.PORT || 3535);
app.set('views',__dirname + '/views');
app.set('view engine','jade');



app.use(bodyParser());
app.use(methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost/Students');

var mySchema = new mongoose.Schema({
	_id : String,
	name1 : String,
	college : String
});

var user = mongoose.model('stud',mySchema);
app.get('/view',function(req,res){
	user.find({},function(err,docs){
		if(err) res.json(err);
		else res.render('index',{users:docs});
	});

});

app.post('/new',function(req,res){
	new user({
	_id   :  req.body.email,
	name1 : req.body.name1,
	college : req.body.college
}).save(function(err,doc){
	if(err) res.json(err);
	else    res.redirect('/view')
});
});

var server = http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port '+app.get('port'));
});
