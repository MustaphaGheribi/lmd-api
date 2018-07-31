const Joi = require('joi');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    email: String ,
    password: String,
    birthday: Number,
    state: String,
    zip_code: String,
    address: String,
    phone_number: String,
    appointments: [ {
        title: String,
        description : String,
        category : {
            type: String,
            enum: ['Bonding', 'Braces', 'Bridge', 'Cap'],
        },
        days: Date,
        prefered_location: String,
        date : {type: Date, default: Date.now}
    }]
   
});
const Patient = mongoose.model('Patient', patientSchema); 

function validatePatient(patient) {
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(6).max(12).required(),
        birthday: Joi.number().integer().min(1950).max(2013).required(),
        state: Joi.string().required(),
        zip_code: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
    }
    return Joi.validate(patient, schema);
}

module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;