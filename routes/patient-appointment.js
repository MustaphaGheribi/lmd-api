const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db');


router.use(bodyParser.json());
router.post('/create-appointment',(req,res) => {
    const {id,title,description,price,days,prefered_location} = req.body;
    db.findById(id)
        .then(user =>{
            // if(err){
            //     return;
            // }
            const appointments = {};
            appointments.title= title;
            appointments.description = description;
            appointments.price= price;
            appointments.days = days;
            appointments.prefered_location= prefered_location
            user.patientInfo.appointments.push(appointments);
            user.save();
             res.json(user);
        })
        .catch(err => {
            res.status(404).json('Not found');
        });
});

router.post('/update-appointment', (req,res)=> {
    
});

module.exports = router;