const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    phone :{
        type: String,
        required : true
    }
});

const contact = mongoose.model('contact',contactSchema);
module.exports = contact;