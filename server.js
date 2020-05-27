#!/usr/bin/env node
/** server.js  */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 2200;
const fs = require('fs');
const cors = require('cors')

const clearDB = require('./server/utils').clearDB;
app.use(cors());
app.use(morgan('dev'));

app.use(function (req, res, next) {
    console.log(req.originalUrl);
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.resolve('build')));
app.use('/public', express.static(path.resolve('public')));
app.use('/images', express.static(path.resolve('images'), {etag:true, maxAge: (1000*60*60*3)}));

require('./server/use').use(app);

app.use('*', function (req, res, next) {
    const filename = path.join('build', 'index.html')

    fs.readFile(filename, function read(err, result) {
        if (err) {
            console.err('indec html error')
            throw err;
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    });
});

require('./server/db').connect().then(()=>app.listen(port, ()=>console.log('server up')))

setInterval(()=>clearDB(), (1000*60*20)); // clear db one in an hour
