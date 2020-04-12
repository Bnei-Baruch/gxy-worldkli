const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 2200;
const clearDB = require('./utils').clearDB;
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/public', express.static(path.resolve('public')))
require('./use').use(app);

app.listen(port);

console.log('server is up and running on port ' + port);

setInterval(()=>clearDB(), (1000*60*60)); // clear db one in an hour


