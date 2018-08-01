const _ = require('lodash');
const bcrypt = require('bcrypt');
const express= require('express');
const router = express.Router();
const {Patient,validatePatient} = require('../../models/patient');

// GET ALL PATIENTS FROM DATABASE
router.get('/', (req,res)=> {
    Patient.find()
        .then(data => {
            res.json(data);
        }).catch(err =>{res.status(400).json(err.message)})
});

router.post('/signup', async(req, res) => {
    const {name, email, password,birthday, state, zip_code, address, phone_number} = req.body;

    const { error } = validatePatient(req.body); 
    if (error) return res.status(400).json(error.details[0].message);

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
        let newUser= await patient.save();
        newUser = _.pick(newUser, ['_id','name', 'email', 'birthday', 'state', 'zip_code', 'address', 'phone_number']);
        res.json(newUser);
    }catch(err){
        res.status(400).json('Bad request');
    }
});



module.exports = router;