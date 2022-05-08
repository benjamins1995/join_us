var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us',
});

app.get('/', function (req, res) {
  var person = 'SELECT COUNT(*) count FROM users;';
  connection.query(person, function (err, result) {
    if (err) throw err;
    var count = result[0].count;
    res.render('home', { count: count });
  });
});

app.post('/register', function (req, res) {
  var person = { email: req.body.email };
  connection.query('INSERT INTO users SET ?', person, function (err, result) {
    console.log(err);
    console.log(result);
    res.redirect('/');
  });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
