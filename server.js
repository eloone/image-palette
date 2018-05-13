const express = require('express');
const app = express();
const pug = require('pug');
const Rx = require('rxjs/Rx');
const fs = require('fs');
const renderHome = require('./renderHome');

/**
* usage: node server.js and go to http://localhost:3000
* Run this if you want to have your page as a mini local website
* where you can update the images
*/

app.use('/images', express.static(__dirname + '/images'));

app.get('/', function (req, res) {

  const subs = renderHome().subscribe(html => {
    res.send(html);
    subs.unsubscribe();
  });

});

app.listen(3000, function () {
  console.log('Listening on port 3000')
});