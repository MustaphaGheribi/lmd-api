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
    appointments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    isAdmin: Boolean,
    isPatient: Boolean,
    isDentist: Boolean
   
});

const appointmentSchema = new mongoose.Schema( {
    _patient: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Patient' 
     },
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
        required: true
     },
     days: {
        type: Number,
        required: true,
     },
     prefered_location: String,
     date : {type: Date, default: Date.now},
    booked: {
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dentist'
    },
    bookedAt: {type: Date, default: Date.now},
    proposals: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Proposal'
      }
    ]
   
 });
 
const proposalSchema = mongoose.Schema({
    _appointment: {type: mongoose.Schema.Types.ObjectId, ref:'Appointment'},
    day: Date,
    price: Number,
    location: String,
    madeBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dentist'
    },
    madeAt: {type: Date, default: Date.now}
});
patientSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this.id, isDentist: false, isPatient: true}, config.get('jwtPrivateKey'));
    return token;

};
const Patient = mongoose.model('Patient', patientSchema); 
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Proposal = mongoose.model('Proposal', proposalSchema);


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
function validateAppointment(appointment) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(1024).required(),
        category: Joi.string().max(55).required(),
        days: Joi.number().integer().min(1).max(15).required(),   
        prefered_location: Joi.string().max(55).required(),    
    }
    return  Joi.validate(appointment, schema); 
    
}

function validateProposal(proposal) {
    const schema = {
        day: Joi.date().required(),
        price: Joi.number().required(),
        location: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(proposal, schema);
}
module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;
module.exports.Appointment = Appointment;
module.exports.validateAppointment = validateAppointment;
module.exports.Proposal= Proposal;
module.exports.validateProposal = validateProposal;