'use strict';

var path = require('path');
var express = require('express');
var app = express();

var nano = require('nano')('http://localhost:5984');

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
    getDoc('profile', res);
});

function getDoc(name, res) {
    var cv = nano.use('cv');
    cv.get(name, function(err, body) {
        if (!err) {
            console.log('getting document:', name);
            res.send(body);
        } else {
            console.log('error getting document:', name, 'error:', err);
        }
    });
}

app.post('/db/profile', function(req, res) {
    var profile = req.body;
    console.log('*** post ***', profile);

    // put in couch db
    profile.doc_key = 'profile';
    insert_doc(profile, 0);
});

function insert_doc(mydoc, tried) {
    var cv = nano.use('cv');
    cv.insert(mydoc, mydoc.doc_key, function(err, http_body, http_header) {
        if (err) {
            if (err.error === 'conflict' && tried < 1) {

                // get record _rev and retry
                return cv.get(mydoc.doc_key, function(err, doc) {

                    mydoc._rev = doc._rev;
                    insert_doc(mydoc, tried + 1);

                });

            }
        }

    });
}


// run debug
// node --debug-brk index.js