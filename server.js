const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const admin = require('./routes/admin/admin');
const dentist = require('./routes/dentist/dentist');
const patient = require('./routes/patient/patient');
const dentistAuth = require('./routes/dentist/auth');
const patientAuth = require('./routes/patient/auth');
const adminAuth = require('./routes/admin/auth');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://mustapha:stoufa123@ds161411.mlab.com:61411/last-minute-dentists')
.then(()=> { console.log('connected to mongoDB..')})
.catch(err => console.err('Error connecting to MongoDB..'));


if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwt private key is not defined.');
    process.exit(1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/dentist', dentist);
app.use('/api/patient', patient);
app.use('/api/admin', admin);
app.use('/api/admin/auth', adminAuth);
app.use('/api/dentist/auth', dentistAuth);
app.use('/api/patient/auth', patientAuth);


app.listen(process.env.PORT || 3000, (err) => {
    if(err){
        console.err('Error starting the server');
    } else {
        console.log('Listening to server 3000');
    }
});

