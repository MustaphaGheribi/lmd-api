const mongoose = require('mongoose');

mongoose.connect('mongodb://mustapha:stoufa123@ds255451.mlab.com:55451/last-minute-dentist')
.then(()=> { console.log('connected')})
.catch(err => console.log(err))

const Schema = mongoose.Schema;

const UserSchema = new Schema({
dentistInfo : {
    name: String,
    email: {type: String, required: true},
    password: String,
    birthday: Date,
    state: String,
    zip_code: String,
    address: String,
    phone_number: String,
},
patientInfo : {
    name: String,
    email: String,
    password: String,
    birthday: Date,
    state: String,
    zip_code: String,
    address: String,
    phone_number: String,
    appointments: [ {
        title: String,
        description :String,
        price: Number,
        days: Number,
        prefered_location: String,
        date : {type: Date, default: Date.now}
    }]
},
role: String  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;