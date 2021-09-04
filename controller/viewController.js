const {data,smartBagData} = global.customData;

exports.home = (req,res,next)=>{
    res.status(200).render('home',{
        title:`Home`,
        data,
        smartBagData
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


exports.smartBag = (req,res,next)=>{
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


exports.about = (req,res,next)=>{
    res.status(200).render('aboutUs',{
        title:`about`,
    });
};