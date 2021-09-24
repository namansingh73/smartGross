const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is mandatory']
    },
    email:{
        unique:true,
        type:String,
        validate:[validator.isEmail,'Please enter valid Email'],
        required:[true,'Email is mandatory']
    },
    userId:{
        unique:true,
        type:Number,
        required:[true]
    },
    inCart:[
        {
            pid:{
                unique:true,
                type:String
            },
            name:{
                type:String
            },
            brand:{
                type:String
            },
            price:{
                type:Number
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    password:{
        type:String,
        required:[true,'Password is mandatory'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        // required:[true,'Password Confirm is mandatory'],
        // validate:{
        //     validator:function(el){
        //         return el === this.password;
        //     },
        //     message:'Passwords are not same'
        // }
    },
    passwordChangedAt :{
        type:Date
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        return next();
    }
    if(!this.passwordConfirm || this.password!==this.passwordConfirm)
    {
        throw new Error("Please enter same passwords");
    }
    //encrypting the password
    this.password = await bcrypt.hash(this.password,12);
    //delele the confirm password
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew)
    {
        return next();
    }
    this.passwordChangedAt = Date.now()-1000;
    next();
});
 
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.methods.changedPasswordAfter = function(timeStamp){
    if(this.passwordChangedAt)
    {
        const changedAt = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return timeStamp < changedAt;
    }
    //False means not changed
    return false;
};

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now()+10*60*1000;
    return resetToken;
};

const User = mongoose.model('User',userSchema);
module.exports = User;