const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addCart = async (req,res,next)=>{
    const product = req.body;
    const idx = req.user.inCart.findIndex((cartProduct)=>{
        return cartProduct.pid === product.pid;
    });
    if(idx!==-1)
    {
        req.user.inCart[idx].quantity = product.quantity;
    }
    else
    {
        req.user.inCart.push(product);
    }
    await req.user.save();
    return res.status(201).json({
        "message":"success"
    }); 
};

exports.clearCart = async (req,res,next)=>{
    req.user.inCart = [];
    await req.user.save();
    return res.status(201).json({
        "message":"success"
    });
};

exports.cartSaveChanges = async (req,res,next)=>{
    req.user.inCart = req.body;
    await req.user.save();
    return res.status(201).json({
        "message":"success"
    });
};

exports.addAllFromSmart = async (req,res,next)=>{
    req.body.forEach(product => {
        const idx = req.user.inCart.findIndex((cartProduct)=>{
            return cartProduct.pid == product.pid;
        });
        //console.log(idx);
        if(idx!==-1)
        {
            req.user.inCart[idx].quantity = product.quantity;
        }
        else
        {
            req.user.inCart.push(product);
        }
    });
   
    await req.user.save();
    return res.status(201).json({
        "message":"success"
    }); 
};

exports.addSmart = async (req,res,next)=>{
    return res.status(201).json({
        "message":"success"
    }); 
    // //console.log("addSmart function");
    // const idVar = req.body.idVar;
    // const quanVar = req.body.quanVar;
    // const product = smartBagData.find(d=>(d.id==idVar));
    // // product.quantity = quanVar;
    // product.inCart = true;
    // await fs.writeFile((path.join(__dirname,'../smartBagData.json')),JSON.stringify(smartBagData),()=>{
    //     res.status(201).json({
    //         "message":"success"
    //     }); 
    // });
};