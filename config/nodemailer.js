require('dotenv').config();
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodeMailer.createTransport({
    service : 'gmail',
    host: 'smpt.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user : process.env.smptMail,
        pass : process.env.smtpMailPass
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data, 
        function(err, template){
            if(err){console.log(`error in rendering mail template ${err}`); return;}

            mailHTML = template;
        }
    );
    return mailHTML;
}


module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}