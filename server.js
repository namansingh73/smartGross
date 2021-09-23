const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json')));
const smartBagData = JSON.parse(fs.readFileSync(path.join(__dirname,'smartBagData.json')));
const https = require('https');
global.customData = {data,smartBagData};
const app = require('./app');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios');
const { CLIENT_RENEG_LIMIT } = require('tls');
// server requests

dotenv.config({path: `./config.env`});

const DB=process.env.DATABASE_URL.replace('PASSWORD',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connection successful');
});

const url = "http://127.0.0.1:5000/productRecommendation?userId=1"
// const bagData = 
app.use("/getData",async (req,res,next)=>{
    const response = await axios({
        method: 'GET',
        url: url,
      });
      console.log(response.data)
      res.status(200).json({
        status:'success'
    });
    
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port`);
  
});
