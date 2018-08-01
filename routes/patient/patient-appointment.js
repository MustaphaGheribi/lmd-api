// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const db = require('./db');


// router.use(bodyParser.json());
// router.post('/create-appointment',(req,res) => {
//     //JOI validation.
//     const {id,title,description,category,days,prefered_location} = req.body;
//     db.findById(id)
//         .then(user =>{
//             if(user.role==='dentist'){
//                 res.status(404).json('Not found');
//                 return;
//             }
//             const appointments = {};
//             appointments.title= title;
//             appointments.description = description;
//             appointments.category = category;
//             appointments.days = days;
//             appointments.prefered_location= prefered_location;
//             user.patientInfo.appointments.push(appointments);
//             user.save().
//                 then(updatedUser => {
//                     res.json(updatedUser);
//                 })
//                 .catch(err => {
//                     res.json(err.message);
//                 })
//         })
//         .catch(err => {
//             res.status(404).json('User not found');
//         });
// });

// router.post('/update-appointment', (req,res)=> {
    
// });

// module.exports = router;