const express = require('express');
const router = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');
const Joi = require('joi');

router.use(bodyParser.json());

router.post('/',(req, res)=> {
    const {name, email, password, role, state, zip_code, address, phone_number} = req.body;
    const user = new db();
    if(role==='dentist'){
        user.dentistInfo.name = name;
        user.dentistInfo.email = email;
        user.dentistInfo.password = password;
        user.role= role;
        user.dentistInfo.state = state;
        user.dentistInfo.zip_code = zip_code;
        user.dentistInfo.address = address;
        user.dentistInfo.phone_number = phone_number;
        user.save().then(data => {
            res.json(data);
        })
        .catch(err => {
            for (field in err.erros)
                res.json(err.erros[field].message);
        })
    } else if(role==='patient') {
        user.patientInfo.name = name;
        user.patientInfo.email = email;
        user.patientInfo.password = password;
        user.role= role;
        user.patientInfo.state = state;
        user.patientInfo.zip_code = zip_code;
        user.patientInfo.address = address;
        user.patientInfo.phone_number = phone_number;
        user.save();
        res.json(user);
    } else {
        res.status(400).json('Unsepecified role');
    }
});


module.exports = router;