const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json')));
const smartBagData = JSON.parse(fs.readFileSync(path.join(__dirname,'smartBagData.json')));

global.customData = {data,smartBagData};

const app = require('./app');
// server requests

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port`);
});