'use strict';


var express = require('express');
var app = express();

var nano = require('nano')('http://localhost:5984');

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

// TODO: use promise instead of passing res
function getDoc(name, res) {
    var cv = nano.use('cv');
    cv.get(name, function(err, body) {
        if (!err) {
            console.log('getting document: %s:', name, body);
            res.send(body);
        } else {
            console.log('error getting document:', name, 'error:', err);
        }
    });
}

app.post('/db/profile', function(req, res) {
    var profile = req.body;
    
    // put in couch db
    profile.doc_key = 'profile';
    insert_doc(profile, 0, res);
});

// TODO: use promise instead of passing res
function insert_doc(mydoc, tried, res) {
    var cv = nano.use('cv');
    cv.insert(mydoc, mydoc.doc_key, function(err, http_body, http_header) {
        if (err) {
            if (err.error === 'conflict' && tried < 1) {

                // get record _rev and retry
                return cv.get(mydoc.doc_key, function(err, doc) {

                    mydoc._rev = doc._rev;
                    insert_doc(mydoc, tried + 1, res);
                });

            }
        } else {
            console.log('updating document: %s:', mydoc.doc_key, mydoc);
            res.send(mydoc);
        }
    });
}


// run debug
// node --debug-brk index.js