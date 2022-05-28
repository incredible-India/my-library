require('dotenv').config()//read the data from .env file
const jwt  =require('jsonwebtoken');//json web token for authentication
const superuser = require('./../modal/superuser');




  function  spusr(req,res,next) {
    
     try{

 
        const token =   req.cookies.jwt ; //cookies
       
        if(token === undefined)
        {
            req.isAuth = null ;
            next();
            return; //agar ye return na likhe to next k baad bhi code excute hota
        }
      
        const varifyUser =  jwt.verify(token, process.env.SECRET_KEY); //varify the cookies
    
        const isAurthised = superuser.findOne({_id : varifyUser._id})//it will check the user that exist in our database or not
        
        if(!isAurthised)
        {
            req.isAuth = null;
            next();
            return; //
        }

        req.isAuth = isAurthised; //it will return null if user is not in database otherwise it return document

        next()
    }catch (error){
       
     
       return res.json({message : "auth file error",
    error :error});


    }
   




}



module.exports = {spusr}