/* AutoTube server
*  Author: Aidan Crowther
*/

//Load required modules
const express = require('express');
const cmdExists = require('command-exists').sync;
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios');
const youtube = require('scrape-youtube');

//https://www.youtube.com/results?search_query=ltt&sp=EgIQAg%253D%253D

var urlEncodedParser = bodyParser.urlencoded({ extended: true });
var app = express();

//Setup server side globals
const PORT = 4000;
const SERVER_ROOT = __dirname+'/server';
const BROWSER_ROOT = __dirname+'/interface';

var ytdlInstalled = cmdExists('youtube-dl');

//respond to request for index.html
app.get('/', function(req, res){
    if(ytdlInstalled){
    	res.sendFile( BROWSER_ROOT + '/index.html');
    }
    else res.send('Please install youtube-dl');
});

app.get('/channelQuery', urlEncodedParser, async (req, res) => {
    let channel = req.query.channel;
    //channelQuery(channel)
    let searchResult = await (await channelQuery(channel)).channels;

    for(let suggestion of searchResult){
        console.log(suggestion.name);
    }

    res.sendStatus(200);
});

//Setup express static server
app.use(express.static('interface'));
app.listen(PORT, function(err){if(err) console.log(err)});

const channelQuery = async(searchTerm) => {
    try {
        return await youtube.search(searchTerm, { type: 'channel' });
      } catch (error) {
        console.error(error);
      }
}