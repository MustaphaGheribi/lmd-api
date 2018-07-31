const express= require('express');
const router = express.Router();
const {Patient,validatePatient} = require('../models/patient');

router.post('/signup', async(req, res) => {
    const { error } = validatePatient(req.body); 
    if (error) return res.status(400).json(error.details[0].message);

    const {name, email, password,birthday, state, zip_code, address, phone_number} = req.body;
    const patient = new Patient();
    patient.name = name;
    patient.email = email;
    patient.password= password;
    patient.birthday= birthday;
    patient.state= state;
    patient.zip_code = zip_code;
    patient.address = address;
    patient.phone_number = phone_number;
    try{
        const newUser= await patient.save();
        res.json(newUser);
    }catch(err){
        res.status(400).json('Bad request');
    }
   
});

module.exports = router;