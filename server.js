const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json')));
const smartBagData = JSON.parse(fs.readFileSync(path.join(__dirname,'smartBagData.json')));

global.customData = {data,smartBagData};

const app = require('./app');
// server requests

dotenv.config({path: `./config.env`});

const DB=process.env.DATABASE_URL.replace('PASSWORD',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connection successful');
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port`);
});