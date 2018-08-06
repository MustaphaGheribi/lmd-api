const auth = require('../../middleware/auth/dentist/auth');
const Adminauth = require('../../middleware/auth/admin/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express= require('express');
const router = express.Router();
const {Dentist, validateDentist} = require('../../models/dentist');
const {Appointment, Proposal, validateProposal} = require('../../models/patient');
// GET ALL DENTISTS FROM DATABASE
router.get('/',Adminauth,async (req,res)=> {
    const dentists = await Dentist.find();
    res.json(dentists);
   
});

router.post('/signup', async(req, res) => {
    const {name, email, password,birthday, state, zip_code, address, phone_number} = req.body;
    // Validate using JOI
    const { error } = validateDentist(req.body); 
    if (error) return res.status(400).json(error.details[0].message);
    // Check if the user is already registered.
    try{
        let user = await Dentist.findOne({email});
        if(user) return res.status(404).json('User already registered.');
        //Hashing the password.
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const dentist = new Dentist();
        dentist.name = name;
        dentist.email = email;
        dentist.password= hash;
        dentist.birthday= birthday;
        dentist.state= state;
        dentist.zip_code = zip_code;
        dentist.address = address;
        dentist.phone_number = phone_number;
        let newUser= await dentist.save();
        newUser = _.pick(newUser, ['_id','name', 'email', 'birthday', 'state', 'zip_code', 'address', 'phone_number']);
        const token = dentist.generateAuthToken();
        res.header('x-auth-token', token).json(newUser);
    }catch(err){
        res.status(500).json('An error occured.');
    }
});

router.post('/propose/:id', auth,async(req,res)=>{
    const {price,days,location} = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if(!appointment) return res.status(404).json('No appointment with the given ID.');
    if(appointment.booked) return res.status(400).json('Appointment already booked.');
    const { error } = validateProposal(req.body); 
    if (error) return res.status(400).json(error.details[0].message);
    const proposal = new Proposal({
        _appointment: req.params.id,
        price,
        days,
        location,
        madeBy: req.user.id,
    });
    const result = await proposal.save();
    res.json(result);
});
module.exports = router;