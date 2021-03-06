const dotenv = require('dotenv');
const mongoose = require('mongoose');
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
// const bagData = 
//app.use("/getData");

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port`);
  
});
