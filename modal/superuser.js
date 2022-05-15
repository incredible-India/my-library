const mongoose = require('mongoose');

const schema = mongoose.Schema;

const superuserSchema = new Schema({

    name :{
        type : String,
        require:true,

    },
    email :{
        type : String,
        require:true,
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