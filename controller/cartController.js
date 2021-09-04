const {data,smartBagData} = global.customData;
const fs = require('fs');
const path = require('path');

exports.addCart = async (req,res,next)=>{
    // console.log("HI");
    const idVar = req.body.idVar;
    const quanVar = req.body.quanVar;
    const product = data.find(d=>(d.id==idVar));
    product.quantity = quanVar;
    product.inCart = true;
    await fs.writeFile((path.join(__dirname,'../data.json')),JSON.stringify(data),()=>{
        res.status(201).json({
            "message":"success"
        }); 
    });
};

exports.clearCart = async (req,res,next)=>{
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
    await fs.writeFile((path.join(__dirname,'../data.json')),JSON.stringify(data),()=>{
        fs.writeFile((path.join(__dirname,'../smartBagData.json')),JSON.stringify(smartBagData),()=>{
            res.status(201).json({
                "message":"success"
            });
        });
    });
};

exports.cartSaveChanges = async (req,res,next)=>{
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
    await fs.writeFile((path.join(__dirname,'../data.json')),JSON.stringify(data),()=>{
        fs.writeFile((path.join(__dirname,'../smartBagData.json')),JSON.stringify(smartBagData),()=>{
            res.status(201).json({
                "message":"success"
            });
        });
    });
};

exports.addAllFromSmart = async (req,res,next)=>{
    const product = smartBagData;
    for(let i=0;i<product.length;i++)
    {
        product[i].inCart = true;
    }
    await fs.writeFile((path.join(__dirname,'../smartBagData.json')),JSON.stringify(smartBagData),()=>{
        res.status(201).json({
            "message":"success"
        }); 
    });
};

exports.addSmart = async (req,res,next)=>{
    console.log("HI");
    const idVar = req.body.idVar;
    const quanVar = req.body.quanVar;
    const product = smartBagData.find(d=>(d.id==idVar));
    product.quantity = quanVar;
    product.inCart = true;
    await fs.writeFile((path.join(__dirname,'../smartBagData.json')),JSON.stringify(smartBagData),()=>{
        res.status(201).json({
            "message":"success"
        }); 
    });
};