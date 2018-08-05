const winston = require('winston');

module.exports = function(err,req,res,next) {
    // Log error
    winston.error(err.message,err); 
    res.status(500).json('An error occured.');  
};