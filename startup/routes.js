const error = require('../middleware/error');
const admin = require('../routes/admin/admin');
const dentist = require('../routes/dentist/dentist');
const patient = require('../routes/patient/patient');
const dentistAuth = require('../routes/dentist/auth');
const patientAuth = require('../routes/patient/auth');
const adminAuth = require('../routes/admin/auth');
const appointment = require('../routes/patient/app');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/dentist', dentist);
    app.use('/api/patient', patient);
    app.use('/api/admin', admin);
    app.use('/api/admin/auth', adminAuth);
    app.use('/api/dentist/auth', dentistAuth);
    app.use('/api/patient/auth', patientAuth);
    app.use('/api/appointment', appointment);
    app.use(error);
};