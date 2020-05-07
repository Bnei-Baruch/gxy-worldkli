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
app.use('/images', express.static(path.resolve('images'), {etag:true, maxAge: (1000*60*60*3)}));
require('./use').use(app);

require('./db').connect().then(()=>app.listen(port, ()=>console.log('server up')))

setInterval(()=>clearDB(), (1000*60*60)); // clear db one in an hour


