const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const {promisify} = require('util');
const Email = require('../utils/email');
//const sendMail = require('./../public/js/email');
const crypto = require('crypto');
const getBaseUrl = require('../utils/getBaseUrl');
const { clearScreenDown } = require('readline');

const signToken =id=>{
        return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user,statusCode,res)=>{
    const token = signToken(user._id);

    res.cookie('jwt',token,{
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000
        ),
        httpOnly:true
      });
      //Remove the password
      user.password = undefined;
        res.status(statusCode).json({
            status:'success',
            token,
            data:{
                data:user
            }
        });
};


exports.signUp = async(req,res,next)=>{
    try{
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            userId:await User.countDocuments()+1,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
        });
        await new Email({email:req.body.email,name:req.body.name},getBaseUrl(req)).sendWelcome();
        createSendToken(user,201,res);
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:'fail',
            message:'Signup failed! Try again later!'
     });
    }
};

exports.reDirect = async (req,res)=>{
    res.redirect('/mainpage');
    return;
};

exports.isLoggedIn = async (req,res,next)=>{
    try{
        if(req.cookies.jwt)
        {
        //1)Verification of the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
        //2)Check if user still exists
        const freshUser = await User.findById(decoded.id);
        if(!freshUser)
        {
            res.redirect('/login');
            return;
        }
        //3)Check if user changed password after token was issued
        if(freshUser.changedPasswordAfter(decoded.iat))
        {
            res.redirect('/login');
            return;
        }
        req.user = freshUser;
        //console.log(req.user);
        //There is a logged in user
        next();
    }
    else
    {
        res.redirect('/login');
        return;
    }
  }catch(err){
    res.redirect('/login');
    return;
  }
};
  
exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
      //Roles is an array
      if(!roles.includes(req.user.role))
      {
        res.status(400).json({
            status:'fail',
            message:'You dont have access to this function'
        });
        return next();
      }
      next();
    };
};

exports.logout = (req,res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
};

exports.login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
    if(!email || !password)
    {
        res.status(400).json({
            status:'fail',
            message:'Your email or password is incorrect'
        });
        return next();
    }
    const user = await User.findOne({email}).select('+password');
    if(!user || !( await user.correctPassword(password,user.password)))
    {
        res.status(400).json({
            status:'fail',
            message:'Incorrect email or password'
        });
        return next();
    }
    createSendToken(user,201,res);
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
     });
    }
};

exports.protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.jwt)
    {
        token = req.cookies.jwt;
    }
    if(!token)
    {
        res.status(400).json({
            status:'fail',
            message:'Yor are not logged in'
        });
        return next();
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user)
    {
        res.status(400).json({
            status:'fail',
            message:'Web token has expired'
        });
        return next();
    }
    if(user.changedPasswordAfter(decoded.iat))
    {
        res.status(400).json({
            status:'fail',
            message:'Password changed recently'
        });
        return next();
    }
    req.user = user;
    res.locals.user = user;
    next();
};

exports.forgotPassword = async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user)
    {
        res.status(400).json({
            status:'fail',
            message:'User not found!'
        });
        return next();
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave:false});

    try{
        const resetURL = `/resetpassword/${resetToken}`;
        await new Email({email:user.email,name:user.name},getBaseUrl(req)).sendPasswordResetToken({relativeUrl:resetURL,time:"10 minutes"});
        res.status(200).json({
          status:'success',
          message:'Token sent to email'
        });
      }catch(err)
      {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave:false});
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'There was error sending email'
        });
        return next();
      }
};

exports.resetPassword = async(req,res,next)=>{
    //1)Get User Based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:
    Date.now()}});
    //2) If token has not expired, set the password for the user
        if(!user)
        {
        res.status(500).json({
            status:'fail',
            message:'Token expired or unavailable!'
        });
        return next();
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
    
    //3)Update changedPasswordAt for the user
    //4)Log the user in, send jwt
    await new Email({email:user.email,name:user.name},getBaseUrl(req)).sendPasswordResetConfirmation();
    createSendToken(user,200,res);
};
      