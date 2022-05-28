
//Schema for the new user..
require('dotenv').config();//reading the file to the database
const mongoose = require('mongoose');//for the mongodb database
const bcryptjs =require('bcryptjs');//bcrypte password before saving the data
const jwt = require('jsonwebtoken');//jwt genrate and varify the token

const schema = mongoose.Schema;

const superuserSchema = new schema({

    fname :{
        type : String,
        require:true,

    },
    lname :{
        type : String,
        require:true,

    },
    email :{
        type : String,
        require:true,
        unique : true
    },
    password :{
        type : String,
        require:true,
    },
    image:{
        type : String,
        require:true,

    },
    idDOB:{
        type : Date,
        default: new Date(),
    }
,
    tokens:[{token:{
        type:String,
        require:true

    }}]
})


superuserSchema.methods.generateTheToken = function()
{
   const tokenGenrate = jwt.sign({_id : this._id}, process.env.SECRET_KEY);//this will generate a token

   //now save in database this token 

   this.tokens = this.tokens.concat( {tokendbs : tokenGenrate} );


   this.save();
   
 
   return tokenGenrate;

//    


}



superuserSchema.pre('save', function(next){
 

 if(this.isModified('password'))
 {
     this.password =  bcryptjs.hashSync(this.password,10);
    //  this.cnfpassword =bcryptjs.hashSync(this.cnfpassword);
 }
 next();

})

module.exports = mongoose.model('superuser',superuserSchema);