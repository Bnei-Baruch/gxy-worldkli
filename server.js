#!/usr/bin/env node
/** server.js  */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 2200;
const fs = require('fs');

const clearDB = require('./server/utils').clearDB;
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.resolve('build')));
app.use('/public', express.static(path.resolve('public')));

require('./server/use').use(app);
require('./server/db').connect().then(()=>app.listen(port, ()=>console.log('server up')))

setInterval(()=>clearDB(), (1000*60*60)); // clear db one in an hour


if (!fs.existsSync('./public/users')){
    fs.mkdirSync('./public/users');
    console.log('public/users folder successfully created');
}
