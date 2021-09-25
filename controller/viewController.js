const axios = require('axios');

exports.home = async (req,res,next)=>{
    const smartDataUrl = `https://smart-groceries.herokuapp.com/productRecommendation?userId=${req.user.userId}`
    const smartBag = await axios({
        method: 'GET',
        url: smartDataUrl,
    });
    const allProdUrl = 'https://smart-groceries.herokuapp.com/getProductList';
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
    const insideCart = req.user.inCart;
    let totalAmount = 0;
    for(let i=0;i<insideCart.length;i++)
    {
        totalAmount += insideCart[i].price*insideCart[i].quantity;
    }
    return res.status(200).render('cart',{
        title:`Cart`,
        insideCart,
        totalAmount
    });
};


exports.previousOrder = async (req,res,next)=>{
    const prevOrdersUrl = `https://smart-groceries.herokuapp.com/getUserOrderHistory?userId=${req.user.userId}`
    const prevOrders = await axios({
        method: 'GET',
        url: prevOrdersUrl,
    });
    const ifInCart = (product)=>{
        const cartProduct = req.user.inCart.find(({pid})=>pid==product.pid);
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
    let totalAmount = 0;
    const productId = new Set();
    const allPrevOrders = [];
    for([oid,uid,date,name,pid,price,brand] of prevOrders.data)
    {
        if(!productId.has(pid))
        {
            allPrevOrders.push(ifInCart({date,name,pid,price,brand,quantity:1}));
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