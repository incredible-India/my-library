//all the login and logout relate code 

const express = require('express');

const router = express.Router();

const path = require('path');



//routing code

router.get('/login', (req, res) => {

    res.render('login')
})


//superuser ceate account page

router.get('/superuser', (req, res) => {

   return  res.status(200).sendFile(path.join(__dirname, '../public/src/html/superuser.html'))

})


//exporting this router page
module.exports = router;