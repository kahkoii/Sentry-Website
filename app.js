// Packages
var express = require('express');
var app = express();

// Port
var PORT = process.env.PORT || 3000;
app.listen(PORT);

// Define templating engine
app.set('view engine', 'ejs');

// Use static files
app.use(express.static('./public'));

// Routing
var student = require('./controllers/student');
var staff = require('./controllers/staff');
var api = require('./controllers/api');
app.use('/', student);
app.use('/student', student);
app.use('/staff', staff);
app.use('/api', api);