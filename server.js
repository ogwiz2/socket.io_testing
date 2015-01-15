var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server = require('http').Server(app);
var router = express.Router();
var io = require('socket.io')(server);

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/client');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
};

app.use(allowCrossDomain);

app.use('/', router);

// Front End
router.get('/', function(req, res) {
	res.render('index');
});

var chatMessages = [];
var users = 0;

io.on('connection', function(socket) {

	socket.on('entered', function(data) {
		users++;
		io.emit('newUserCount', { count: users });
	});

});

server.listen(1337);

module.exports = server;
