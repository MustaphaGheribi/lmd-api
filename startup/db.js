const mongoose = require('mongoose');


module.exports = function() {
    mongoose.connect('mongodb://mustapha:stoufa123@ds221631.mlab.com:21631/last-minute-dentists')
    .then(()=> { console.log('connected to mongoDB..')})
}