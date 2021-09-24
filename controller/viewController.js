const {data,smartBagData} = global.customData;
const axios = require('axios');

exports.home = async (req,res,next)=>{
    const smartDataUrl = `http://127.0.0.1:5000/productRecommendation?userId=${req.user.userId}`
    const smartBag = await axios({
        method: 'GET',
        url: smartDataUrl,
    });
    const allProdUrl = 'http://127.0.0.1:5000/getProductList';
    const allProducts = await axios({
        method: 'GET',
        url:allProdUrl
    });
    const ifInCart = (product)=>{
        const cartProduct = req.user.inCart.find(({pid})=>pid==product.id);
        // console.log(cartProduct, product.id);
        if(cartProduct)
        {
            product.quantity = cartProduct.quantity;
            product.inCart = true;
            // console.log(product,"Hi");
        }
        else
        {
            product.inCart = false;
        }
        //console.log(product);
        return product;
    };
    const smartData = smartBag.data.map(([id,name,price,brand])=>{
        return ifInCart({id,name,price,brand,quantity:1});
    });
    const allProductData = allProducts.data.map(([id,name,price,brand])=>{
        return ifInCart({id,name,price,brand,quantity:1});
    });
    res.status(200).render('home',{
        title:`Home`,
        smartBagData:smartData,
        allData:allProductData
    });
};


exports.cart = (req,res,next)=>{
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


exports.previousOrder = async (req,res,next)=>{
    const prevOrdersUrl = `http://127.0.0.1:5000/getUserOrderHistory?userId=${req.user.userId}`
    const prevOrders = await axios({
        method: 'GET',
        url: prevOrdersUrl,
    });
    let totalAmount = 0;
    const productId = new Set();
    const allPrevOrders = [];
    for([oid,uid,date,name,pid,price,brand] of prevOrders.data)
    {
        if(!productId.has(pid))
        {
            allPrevOrders.push({oid,uid,date,name,pid,price,brand,quantity:1});
            totalAmount += price;
            productId.add(pid);
        }
    }
    res.status(200).render('index',{
        title:`Previous Orders`,
        totalAmount,
        previousHistory:allPrevOrders
    });
};


exports.about = (req,res,next)=>{
    res.status(200).render('aboutUs',{
        title:`about`,
    });
};

exports.loginPage = (req,res,next)=>{
    res.status(200).render('authentication/login',{
        title:'login'
    })
};

exports.signupPage = (req,res,next)=>{
    res.status(200).render('authentication/signup-complete',{
        title:'signup'
    })
};

exports.forgotPassword = (req,res,next)=>{
    res.status(200).render('authentication/forgot-password',{
        title:'Forgot Password'
    })
};

exports.resetPassword = (req,res,next)=>{
    res.status(200).render('authentication/reset-password',{
        title:'Reset Password',
        token:req.params.token
    })
};