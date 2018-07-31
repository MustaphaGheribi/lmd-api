const mongoose = require('mongoose');
const express= require('express');
const router = express.Router();
const {Dentist, validateDentist} = require('../models/dentist');


router.post('/signup', async(req, res) => {
    const { error } = validateDentist(req.body); 
    if (error) return res.status(400).json(error.details[0].message);

    const {name, email, password,birthday, state, zip_code, address, phone_number} = req.body;
    const dentist = new Dentist();
    dentist.name = name;
    dentist.email = email;
    dentist.password= password;
    dentist.birthday= birthday;
    dentist.state= state;
    dentist.zip_code = zip_code;
    dentist.address = address;
    dentist.phone_number = phone_number;
    try{
        const newUser= await dentist.save();
        res.json(newUser);
    }catch(err){
        res.status(400).json('Bad request');
    }
});

module.exports = router;