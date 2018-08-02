const auth = require('../../middleware/auth/admin/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express= require('express');
const router = express.Router();
const {Dentist, validateDentist} = require('../../models/dentist');

// GET ALL DENTISTS FROM DATABASE
router.get('/',auth, async (req,res)=> {
    try{
        const dentists = await Dentist.find();
        res.json(dentists);
    }catch(err){
        res.status(400).json(err.message);
    }
});

router.post('/signup', async(req, res) => {
    const {name, email, password,birthday, state, zip_code, address, phone_number} = req.body;
    // Validate using JOI
    const { error } = validateDentist(req.body); 
    if (error) return res.status(400).json(error.details[0].message);
    // Check if the user is already registered.
    let user = await Dentist.findOne({email});
    if(user) return res.status(400).json('User already registered.');
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
    try{
        let newUser= await dentist.save();
        newUser = _.pick(newUser, ['_id','name', 'email', 'birthday', 'state', 'zip_code', 'address', 'phone_number']);
        const token = dentist.generateAuthToken();
        res.header('x-auth-token', token).json(newUser);
      
    }catch(err){
        res.status(404).json(err.message);
    }
});



module.exports = router;