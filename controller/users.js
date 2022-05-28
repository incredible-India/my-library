//all the login and logout relate code 

const express = require('express');

const router = express.Router();

const path = require('path');

const multer = require('multer');//for file and image upload

const cookieParser =  require('cookie-parser');

const superuserDB = require('./../modal/superuser');

const { check, validationResult } = require('express-validator');//it will check the form validation on server

const bcryptjs = require('bcryptjs'); //decrypting and encrpting the password

const isAuth =  require('./../auth/allAuth');

//middlewares
router.use(express.urlencoded({ extended: true }))//parsing data from url in json formate
router.use(cookieParser());
router.use(express.static(path.join(__dirname, './')));

//for the image upload seetings
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'./../superuser/'))
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
});


const upload = multer({
    storage:storage,

});



//routing code

router.get('/login', (req, res) => {

    res.render('login',{

        navbar : {'Login' : '/users/login/', 'Services': '/services', 'About': '/about'},
        message : null
    })
})


//login 

router.post('/login/varification',[
    check('id').not().isEmpty().trim(),
    check('password').not().isEmpty().trim(),
], isAuth.spusr ,async(req, res) => {

    let user =  await req.isAuth;

    if(user)
    {
        return res.redirect('/');
    }else
    {

        let id  =  req.body.id;
        let password  =  req.body.password;

        let loginFor =  req.body.super

        if(loginFor == 'super'){


          let superUser =  await superuserDB.findOne({email : id});

            if(!superUser)
            {
                return res.render('login',
                {
                    navbar : {'Login' : '/users/login/', 'Services': '/services', 'About': '/about'},
                    'message' : 'No email exists..',
                })

            }else
            {
                if(superUser.email == id)
                {
                  let passwordMatched = bcryptjs.compareSync(password, superUser.password);
      
                  if(passwordMatched)
                  {
                       const tokenlogin = superUser.generateTheToken();

                        res.cookie("jwt", tokenlogin, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)) });//we set the expairy date for 24 hrs
                      return res.redirect('/');
                  }else
                  {
                        return res.render('login',
                        {    navbar : {'Login' : '/users/login/', 'Services': '/services', 'About': '/about'},
                            'message' : 'Invalid provided data',
                        })
                  }
      
                }else
                {
                      return res.render('login',
                      {
                        navbar : {'Login' : '/users/login/', 'Services': '/services', 'About': '/about'},
                          'message' : 'Invalid provided data',
                      })
                }
            }
               


        }else if(loginFor == 'admin'){

            return res.send('admin')

        }else if(loginFor == 'student'){

            return res.send('student')
        }else{

            return res.status(402).send('Access is not valid')

        }
        // let passwordMatched = bcryptjs.compareSync(req.body.password, loginInfo.password);//comparing the password


    }

})






//superuser ceate account page
//this is the secret routing page a particular memner can open it the password is in dot env file it will verified..

router.get('/superuser',isAuth.spusr,async (req, res) => {

    
    let  auth = await  req.isAuth;



    if(!auth)
        return  res.status(200).sendFile(path.join(__dirname, '../public/src/html/superuser.html'))
    else
        return res.redirect('/')
        



})


//now getting the the data of the super user form

router.post('/superuser/verification',upload.single('superuserImg') ,[

    check('fname').not().isEmpty().trim(),
    check('lname').not().isEmpty().trim(),
    check('email').isEmail().normalizeEmail().trim(),
  
    check('password').not().isEmpty().trim(),
    check('cnfpassword').not().isEmpty().trim(),

],async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {  //if any error found for validating user data

        return res.json({
            status: false,

            message: "validation error in registration",

            error: errors.array()
        })

    }

    //now for the image validation

    //req.file all the properties related to image is inside this...

    if(!req.file) {

        return res.status(500).send("Error in image upload...");

    }

    //password verification is required
    if(req.body.password !== req.body.cnfpassword) {

        return res.status(500).send("<h3> Passsowrd and confirm password does not match </h3>");

    }
    //now we will save the data in the database..


    //first checking the email in the database to check email exist or not

    let isExistEmail =  await superuserDB.findOne({email : req.body.email})
    .catch(err => {
        return res.status(500).send(err)
    })

    if(isExistEmail)
    {
        return res.status(500).send("</h1>Email Already Exist.. go for log in </h3>")
    }else
    {

        let saveDataUser  = new superuserDB({

            fname : req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:req.body.password,
            image: req.file.filename
        })


        const token = saveDataUser.generateTheToken();  //it will generate the token when user will registration itself

        res.cookie('jwt', token, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)) }); // generated token we will save in cookie and varify this latar when user will login
        //we set the expairy date for 24 hrs
        return res.redirect('/');//yeha pug wala karna hai

  

    }

})

//superuser logout 

router.get('/spr/logout',isAuth.spusr, async (req, res) => {


    let user  =  await req.isAuth;

    if(! user)
    {
        return   res.status(400).send('<h1> No access </h1>')
    }
    else
    {

     

    if (user) {

        // console.log(UserAuth);
        user.tokens = []; //this logout from all devices and make token emapty in dbs
        res.clearCookie('jwt');  //clear the cookies
        user.save(); //save changes the data in dbs
        return res.redirect('/'); //redirect the home page

    } else {
        res.clearCookie('jwt');
        return res.redirect('/');

    }


    }
        
    

})


// for the super userprofile...

router.get('/spr/profile/',isAuth.spusr,async function(req, res){


    let auth  =  await req.isAuth;

    if(!auth)
    {
      return   res.status(400).send('<h1> No access </h1>')
    }

    return res.status(200).render('sprprofile',{
        navbar : {'Home' : '/', 'Accoim': '/smsjs', 'Announace': '/smsjs','Logout':'/users/spr/logout/'},
        data : auth
        ,img: `./../../superuser/${auth.image}`
    
    })


})


//exporting this router page
module.exports = router;