'use strict'

var express = require('express');
var app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
    console.log('Running on localhost:', PORT);
});
