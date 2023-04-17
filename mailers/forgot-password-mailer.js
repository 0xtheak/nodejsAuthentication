const nodemailer = require('../config/nodemailer');


exports.forgotPassword = (user) => {
    console.log(user);
    
    let htmlString  = nodemailer.renderTemplate({
        user : user}, '/passwords/new_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'techbooster912@gmail.com',
        to: user._doc.email,
        subject : 'Password recovery',
        html : htmlString
    }, (err, info) => {
        if(err){
            console.log('errror in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
} 