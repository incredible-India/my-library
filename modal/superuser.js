const mongoose = require('mongoose');

const schema = mongoose.Schema;

const superuserSchema = new Schema({

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

    },
    idDOB:{
        type : Date,
        default: new Date(),
    }
})


module.exports = mongoose.model('superuser',superuserSchema);