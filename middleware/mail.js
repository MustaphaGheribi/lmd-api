const nodemailer = require('nodemailer');

module.exports = function(user) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stougheribi08@gmail.com',
            pass: 'safe123#'
        }
    });

    const mailOptions = {
        from: 'stougheribi08@gmail.com',
        to: user.email,
        subject: 'SIGN UP',
        html:
        `
            <div> 
                <h1>${user.name} Welcome to Last Minute Dentist.</h1>
            </div>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}