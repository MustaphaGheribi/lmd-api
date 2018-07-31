const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dentist = require('./routes/dentist');
const patient = require('./routes/patient');
// const patientAppointment = require('./routes/patient-appointment');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://mustapha:stoufa123@ds161411.mlab.com:61411/last-minute-dentists')
.then(()=> { console.log('connected to mongoDB..')})
.catch(err => console.err('Error connecting to MongoDB..'));


app.use('/api/dentist', dentist);
// app.use('/api/appointment', patientAppointment);
app.use('/api/patient',patient);


app.listen(process.env.PORT || 3000, (err) => {
    if(err){
        console.log('Error starting the server');
    } else {
        console.log('Listening to server 3000');
    }
});

