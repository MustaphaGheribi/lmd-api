const _ = require('lodash');
const bcrypt = require('bcrypt');
const express= require('express');
const router = express.Router();
const {Patient,validatePatient} = require('../../models/patient');
const adminAuth = require('../../middleware/auth/admin/auth');
const patientAuth = require('../../middleware/auth/patient/auth');
const signUpMailer = require('../../middleware/mail');

// GET ALL PATIENTS FROM DATABASE
router.get('/', adminAuth, async(req,res)=> {
    try {
        const patients = await Patient.find();
        res.json(patients);   
    } catch (error) {
        res.status(500).json('An error occured.');        
    }
});

router.post('/signup', async(req, res) => {
    const {name, email, password,birthday, state, zip_code, address, phone_number} = req.body;
    // Validate using JOI
    const { error } = validatePatient(req.body); 
    if (error) return res.status(500).json(error.details[0].message);
   
    // Check if the user is already registered.
    try{
    let user = await Patient.findOne({email});
        if(user) return res.status(500).json('User already registered.');
    //Hashing the password.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const patient = new Patient();
    patient.name = name;
    patient.email = email;
    patient.password= hash;
    patient.birthday= birthday;
    patient.state= state;
    patient.zip_code = zip_code;
    patient.address = address;
    patient.phone_number = phone_number;
        let newUser= await patient.save();
        newUser = _.pick(newUser, ['_id','name', 'email', 'birthday', 'state', 'zip_code', 'address', 'phone_number']);
        const token = patient.generateAuthToken();
        res.header('x-auth-token', token).json(newUser);
        signUpMailer(req.body);
    }catch(err){
        res.status(500).json(err.message);
    }
});

router.get('/me',patientAuth, async(req,res)=>{
    try {
        const patient = await Patient.findById(req.user.id).select('-password');
        res.json(patient);    
    } catch (error) {
        res.status(500).json('An error occured.'); 
    }
});

module.exports = router;