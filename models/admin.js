const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    isPatient: Boolean,
    isDentist: Boolean
});
adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        id: this.id, isDentist: false, isPatient: false, isAdmin: true
    },
     config.get('jwtPrivateKey'));
    return token;

};
const Admin = mongoose.model('Admin', adminSchema); 
module.exports.Admin = Admin;