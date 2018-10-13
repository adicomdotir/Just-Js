const express = require('express');
const app = express();
const playerRouter = require('./routes/player');
const teamRouter = require('./routes/team');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', playerRouter);
app.use('/', teamRouter);

process.on('exit', function () {
    console.log('About to exit.');
});

process.on('SIGINT', function () {
    // console.log('About to exit.');
    process.exit();
});

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", 'localhost', port);
});