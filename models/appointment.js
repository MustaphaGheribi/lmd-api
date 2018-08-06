const Joi = require('joi');
const mongoose = require('mongoose');

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
 const Appointment = mongoose.model('Appointment', appointmentSchema);
 function validateAppointment(appointment) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(1024).required(),
        category: Joi.string().max(55).required(),
        days: Joi.number().integer().min(1).max(15).required(),   
        prefered_location: Joi.string().max(55).required(),    
    }
    return  Joi.validate(appointment, schema); 
    
};

module.exports.Appointment = Appointment;
module.exports.validateAppointment = validateAppointment;
