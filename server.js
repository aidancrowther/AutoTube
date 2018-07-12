/* AutoTube server
*  Author: Aidan Crowther
*/

//Load required modules
var express = require('express');
var cmdExists = require('command-exists');
var fs = require('fs');

var app = express();

//Setup server side globals
const PORT = 4000;
const SERVER_ROOT = __dirname+'/server';
const BROWSER_ROOT = __dirname+'/interface';

//respond to request for index.html
app.get('/', function(req, res){
    res.sendFile( BROWSER_ROOT + '/index.html');
});

//Setup express static server
app.use(express.static('interface'));
app.listen(PORT, function(err){if(err) console.log(err)});