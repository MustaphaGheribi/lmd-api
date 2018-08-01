const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dentist = require('./routes/dentist/dentist');
const patient = require('./routes/patient/patient');
const dentistAuth = require('./routes/dentist/auth');
const bodyParser = require('body-parser');

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwt private key is not defined.');
    process.exit(1);
}

app.use(bodyParser.json());



mongoose.connect('mongodb://mustapha:stoufa123@ds161411.mlab.com:61411/last-minute-dentists')
.then(()=> { console.log('connected to mongoDB..')})
.catch(err => console.err('Error connecting to MongoDB..'));


app.use('/api/dentist', dentist);
app.use('/api/patient',patient);
app.use('/api/dentist/auth', dentistAuth);


app.listen(process.env.PORT || 3000, (err) => {
    if(err){
        console.err('Error starting the server');
    } else {
        console.log('Listening to server 3000');
    }
});

