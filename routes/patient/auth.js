const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express= require('express');
const router = express.Router();
const {Patient} = require('../../models/patient.js');

router.post('/',async (req,res)=>{
    const { email,password } = req.body;
    const { error } = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const user = await Patient.findOne({email});
    if(!user) return res.status(400).json('Invalid email or password.');
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json('Invalid email or password.');
    const token = user.generateAuthToken();
    res.json(token);
   
});




function validate(dentist) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(6).max(12).required(),
    }
    return Joi.validate(dentist, schema);
}
module.exports = router;