//mongodb packages
// require('dotenv').config();

const mongoose = require('mongoose');



mongoose.connect(process.env.DBSURL,{
    
    useNewUrlParser: true, 

    useUnifiedTopology: true 
    
})
 
.then(()=>{

    console.log('Database connected successfully..');

})
.catch(err=>{
    console.log('Database connection error ',err);
})

