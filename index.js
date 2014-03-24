'use strict';

var path = require('path');
var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('connect').bodyParser());

// simple logger
app.use(function(req, res, next) {
    console.log('logger: %s %s', req.method, req.url);
    next();
});

app.use(express.static(__dirname));

app.listen(3000);



app.get('/db/profile', function(req, res) {

    // get from db

    res.json({
        section1: 'bla bla',
        section2: 'jada jada'
    });
});

app.post('/db/profile', function(req, res) {
    var profile = req.body;
    console.log('*** post ***', profile);
});

// run debug
// node --debug-brk index.js