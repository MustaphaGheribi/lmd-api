const mongoose = require('mongoose');
const Joi = require('joi');

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
const Proposal = mongoose.model('Proposal', proposalSchema);

function validateProposal(proposal) {
    const schema = {
        day: Joi.date().required(),
        price: Joi.number().required(),
        location: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(proposal, schema);
};

module.exports.Proposal= Proposal;
module.exports.validateProposal = validateProposal;