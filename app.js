// Packages
var express = require('express');
var app = express();
var session = require('express-session');

// Port
var PORT = process.env.PORT || 3000;
app.listen(PORT);

// Settings
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

// Routing
var student = require('./controllers/student');
var staff = require('./controllers/staff');
var api = require('./controllers/api');
app.use('/', student);
app.use('/student', student);
app.use('/staff', staff);
app.use('/api', api);