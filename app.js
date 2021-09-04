const express = require('express');
const viewRouter = require('./routers/viewRoute');
const path = require('path');
const compression = require('compression');
const app = express();
app.use(express.json({limit:'100kb'}));
app.use(compression());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'pugtemp'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'')));


//view route
app.use('/',viewRouter);

module.exports = app;