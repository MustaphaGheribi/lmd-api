const express = require('express');
const app = express();
const userSignup = require('./routes/user-signup');
const patientAppointment = require('./routes/patient-appointment');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api/dentist/signup', userSignup);
app.use('/api/appointment', patientAppointment);


app.listen(process.env.PORT || 3000, (err) => {
    if(err){
        console.log('Error starting the server');
    } else {
        console.log('Listening to server 3000');
    }
});

