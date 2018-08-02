const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    birthday: Number,
    state: String,
    zip_code: String,
    address: String,
    phone_number: String,
    appointments: [ {
        title: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        description :{
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        category : {
            type: String,
            enum: ['Bonding', 'Braces', 'Bridge', 'Cap'],
        },
        days: {
            type: Number,
            required: true,
        },
        prefered_location: String,
        date : {type: Date, default: Date.now}
    }]
   
});
patientSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this.id, isDentist: false, isPatient: true}, config.get('jwtPrivateKey'));
    return token;

};
const Patient = mongoose.model('Patient', patientSchema); 



function validatePatient(patient) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(6).max(255).required(),
        birthday: Joi.number().integer().min(1950).max(2013).required(),
        state: Joi.string().required(),
        zip_code: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
    }
    return  Joi.validate(patient, schema);
}

module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;