const Joi = require('joi');
const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
    
    name: { type: String},
    email: {type: String},
    password: {type: String},
    birthday: Number,
    state: String,
    zip_code: String,
    address: String,
    phone_number: String,

});
const Dentist = mongoose.model('Dentist', dentistSchema); 

function validateDentist(dentist) {
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
    return Joi.validate(dentist, schema);
}

module.exports.Dentist = Dentist;
module.exports.validateDentist = validateDentist;