const express= require('express');
const router = express.Router();
const { Patient} = require('../../models/patient');
const {Appointment,validateAppointment} = require('../../models/appointment');
const {Proposal} = require('../../models/proposal');
const auth = require('../../middleware/auth/patient/auth');
const adminAuth = require('../../middleware/auth/admin/auth');
const dentistAuth = require('../../middleware/auth/dentist/auth');

router.get('/me',auth, async(req,res)=>{
    try {
        const appointment = await Appointment.find({_patient: req.user.id});
        if(!appointment) return res.status(404).json('No appointments found.');
        res.json(appointment);
        
    } catch (error) {
        res.status(500).json('An error occured.');
    }
});

router.get('/',dentistAuth, async(req,res)=>{
    try {
        const appointments = await Appointment.find({booked: false});
        res.json(appointments);        
    } catch (error) {
        res.status(500).json('An error occured.');
    }
});

router.post('/create',auth, async(req,res)=>{
    const { error } = validateAppointment(req.body); 
    if (error) return res.status(400).json(error.details[0].message);
    const {title,description,category,days,prefered_location} = req.body;
    Patient.findById(req.user.id).then(found =>{
    const appointment = new Appointment({
        _patient: found,
        title,
        description,
        category,
        days,
        prefered_location
    });
        appointment.save().then(saved =>{
            found.appointments = saved;
            res.json(saved);
        })
    }).catch(err=>{res.status(500).json('An error occured.')});
});

router.delete('/delete/:id',auth,async (req,res)=>{
    try {
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment) return res.status(404).json('No appointment with the given ID.'); 
        const result = await Appointment.findOneAndRemove({_id: req.params.id, _patient: req.user.id});
        res.json(result);               
    }catch(err){
        res.status(500).json('An error occured.');      
    }
});

router.put('/update/:id',auth, async(req,res)=>{
    const { error } = validateAppointment(req.body); 
    if (error) return res.status(400).json(error.details[0].message);
    const {title,description,category,days,prefered_location} = req.body;  
    try {
        const result = await Appointment.findOne({_id: req.params.id, _patient: req.user.id});
        if(!result) return res.status(404).json('No appointment with the given ID.');
        result.title= title;
        result.description = description;
        result.category = category;
        result.days = days;
        result.prefered_location = prefered_location;
        const updated = await result.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json(error.message);     
    } 


});

//BOOK appointment.
//Proposal ID
router.post('/book/:id',auth, async(req,res)=>{
    try {
        const proposal = await Proposal.findById(req.params.id);
        if(!proposal) return res.status(404).json('No proposal with the given ID.');
        //PROCESS PAYMENTS HERE. 
        const appointment = await Appointment.findById(proposal._appointment._id);
        if(appointment.booked) return res.status(400).json('Appointment already booked');
        appointment.booked = true;
        appointment.bookedBy = proposal.madeBy;
        const bookedAppointment = await appointment.save();
        res.json({success: true, message: 'booked',bookedAppointment});
    } catch (error) {
        res.status(500).json('An error occured.'); 
    }
});
module.exports = router;