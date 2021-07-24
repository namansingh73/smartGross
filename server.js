const app = require('./app');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json')));
const smartBagData = JSON.parse(fs.readFileSync(path.join(__dirname,'smartBagData.json')));
//to render
const home = (req,res,next)=>{
    res.status(200).render('home',{
        title:`Home`,
        data,
        smartBagData
    });
};
const cart = (req,res,next)=>{
    let tempPre = false;
    let total= 0;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].inCart)
        {
            tempPre = true;
            total += (data[i].quantity*data[i].price);
        }
    }
    for(let i=0;i<smartBagData.length;i++)
    {
        if(smartBagData[i].inCart)
        {
            tempPre = true;
            total += (smartBagData[i].quantity*smartBagData[i].price);
        }
    }
    res.status(200).render('cart',{
        title:`Cart`,
        data,
        smartBagData,
        tempPre,
        total
    });
};
const smartBag = (req,res,next)=>{
    let total = 0;
    for(let i=0;i<smartBagData.length;i++)
    {
        total += (smartBagData[i].quantity*smartBagData[i].price);
    }
    res.status(200).render('index',{
        title:`smartBag`,
        smartBagData,
        total
    });
};




// server requests
const addCart = async (req,res,next)=>{
    const idVar = req.body.idVar;
    const quanVar = req.body.quanVar;
    const product = data.find(d=>(d.id==idVar));
    product.quantity = quanVar;
    product.inCart = true;
    fs.writeFile((path.join(__dirname,'data.json')),JSON.stringify(data),()=>{
        res.status(201).json({
            "message":"success"
        }); 
    });
};

const clearCart = async (req,res,next)=>{
    const product = data;
    for(let x=0;x<product.length;x++)
    {
        product[x].inCart = false;
    }
    const prodSmart = smartBagData;
    for(let x=0;x<prodSmart.length;x++)
    {
        prodSmart[x].inCart = false;
    }
    fs.writeFile((path.join(__dirname,'data.json')),JSON.stringify(data),()=>{
        fs.writeFile((path.join(__dirname,'smartBagData.json')),JSON.stringify(smartBagData),()=>{
            res.status(201).json({
                "message":"success"
            });
        });
    });
};

const cartSaveChanges = async (req,res,next)=>{
    const product = data;
    const pairs = req.body.pairsData;
    for(let i=0;i<product.length;i++)
    {
        let flag = false;
        for(let j=0;j<pairs.length;j++)
        {
            if(product[i].id == pairs[j].id)
            {
                product[i].quantity = pairs[j].quantity;
                flag = true;
                break;
            }   
        }
        product[i].inCart = flag;
    }
    const smartProd = smartBagData;
    for(let i=0;i<smartProd.length;i++)
    {
        let flag = false;
        for(let j=0;j<pairs.length;j++)
        {
            if(smartProd[i].id == pairs[j].id)
            {
                smartProd[i].quantity = pairs[j].quantity;
                flag = true;
                break;
            }   
        }
        smartProd[i].inCart = flag;
    }
    fs.writeFile((path.join(__dirname,'data.json')),JSON.stringify(data),()=>{
        fs.writeFile((path.join(__dirname,'smartBagData.json')),JSON.stringify(smartBagData),()=>{
            res.status(201).json({
                "message":"success"
            });
        });
    });
};

const addAllFromSmart = (req,res,next)=>{
    const product = smartBagData;
    for(let i=0;i<product.length;i++)
    {
        product[i].inCart = true;
    }
    fs.writeFile((path.join(__dirname,'smartBagData.json')),JSON.stringify(smartBagData),()=>{
        res.status(201).json({
            "message":"success"
        }); 
    });
};

const addSmart = (req,res,next)=>{
    const idVar = req.body.idVar;
    const quanVar = req.body.quanVar;
    const product = smartBagData.find(d=>(d.id==idVar));
    product.quantity = quanVar;
    product.inCart = true;
    fs.writeFile((path.join(__dirname,'smartBagData.json')),JSON.stringify(smartBagData),()=>{
        res.status(201).json({
            "message":"success"
        }); 
    });
};

app.get('/',smartBag);
app.get('/home',home);
app.get('/cart',cart);

app.post('/cart',addCart);
app.post('/clearCart',clearCart);
app.post('/cartSaveChanges',cartSaveChanges);
app.post('/addAllInCart',addAllFromSmart);
app.post('/cartSmart',addSmart);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    //registerSW();
    console.log(`App running on port`);
});