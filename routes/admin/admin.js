const _ = require('lodash');
const bcrypt = require('bcrypt');
const express= require('express');
const router = express.Router();
const {Admin} = require('../../models/admin');
const auth = require('../../middleware/auth/dentist/auth');


router.post('/signup',auth, async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const admin = new Admin();
        admin.name = name;
        admin.email = email;
        admin.password= hash;
        let newUser= await admin.save();
        newUser = _.pick(newUser, ['_id','name', 'email']);
        const token = admin.generateAuthToken();
        res.header('x-auth-token', token).json(newUser);
    }catch(err){
        res.status(500).json('An error occured.');
    }
});

module.exports = router;