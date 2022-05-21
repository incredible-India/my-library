/*Himanshu Sharma B.E 6th sem 15-05-2022*/
//pakages
//dotenv File 
require('dotenv').config(); //dotenv file
const express = require('express');
const morgan =  require('morgan'); //debuging
const cors = require('cors'); //handiling cores error
//database connection
dbsConnection = require('./db/dbsConnection');
const path = require('path');
// const chalk = require('chalk');
//router pages
const userlogin = require('./controller/users');

const app =  express();

//port numner

const port = 8000 || process.env.PORT 

//middleware
app.set('view engine','pug');
app.set('views','./views/pug/');
//setting the routing pages
app.use('/users',userlogin);


app.use(express.static(path.join(__dirname, './'))); //for the static files
app.use(morgan('dev'));//morgan
app.use(cors());//cors error

//index page...
app.get('/', (req, res) => {

    res.contentType('text/html');

    res.status(200).render('index')


})




//port number
app.listen(port,()=>{

    console.log('Server is running on port', port);
    

})