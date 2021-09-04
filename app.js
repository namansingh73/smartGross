const express = require('express');
const viewRouter = require('./routers/viewRoute');
const cartRouter = require('./routers/cartRoute');
const userRouter = require('./routers/userRoute');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const app = express();
app.use(express.json({limit:'100kb'}));
app.use(compression());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'pugtemp'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'')));
app.use(cookieParser());

//view route
app.use('/',viewRouter);
app.use('/',cartRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;