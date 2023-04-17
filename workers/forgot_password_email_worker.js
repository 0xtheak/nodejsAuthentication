const queue = require('../config/kue');
const forgotPassMailer = require('../mailers/forgot-password-mailer');


queue.process('forgotPass-emails', function(job, done){
    console.log('emails worker processing your job');
    console.log(job.data);

    forgotPassMailer.forgotPassword(job.data);

    done();
});