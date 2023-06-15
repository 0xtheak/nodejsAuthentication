const User = require('../models/user');
const forgotPassMailer = require('../mailers/forgot-password-mailer');
const crypto = require('crypto');
const forgotPassEmailWorker = require('../workers/forgot_password_email_worker');
const queue = require('../config/kue');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// password change
module.exports.passwordChange = function(req, res){
    console.log(req.body);
    const userId = req.body.user_id;
    if(req.body.new_password !== req.body.confirm_password){
        console.log('from profile');
        req.flash('error', 'New password and confirm is not matching');
        return res.redirect('back');
    }
    User.findById(userId, (err, user)=> {
        if(err){
            req.flash('error', 'error in password change');
            return;
        }
        if(user){
            bcrypt.compare(req.body.old_password, user.password, function(err, result){
                if(result){

                    let hashPassword = new Promise((resolve, reject) => {
                        bcrypt.hash(req.body.new_password, saltRounds, (err, hash) => {
                            if(err) reject(err);
                            resolve(hash);
                        })
                    });
                    hashPassword.then((resultant_hash)=>{
                        if(resultant_hash){
                            user.password=resultant_hash;
                            user.save();
                        }
                    })
                    
                }
            });
        }
        
    });
    req.flash('success', 'Password changed successfully!');
    return res.redirect('back');
}


// password forgot page rendering
module.exports.forgotPassword = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('forgot_password', {
        title : 'Forgot Password'
    });

}

// forgot password mechanism
module.exports.passwordReset = function(req, res){
    
        
        if(req.body.email == undefined){
            return res.redirect('/users/sign-in');
        }
        const pass = crypto.randomBytes(20).toString('hex');
        let hashPassword = new Promise((resolve, reject) => {
            bcrypt.hash(pass, saltRounds, (err, hash) => {
                if(err) reject(err);
                resolve(hash);
            });
        });
        hashPassword.then((resultant_hash) => {
            User.findOneAndUpdate({email : req.body.email},{password: resultant_hash}, { "new": true}, function(err, user){
                if(err){
                    req.flash('error', 'Error in password forgot');
                    return;
                }
                    if(user){
                        const sending_user = {
                            pass : pass, ...user
                        };
                        
                        let job = queue.create('forgotPass-emails', sending_user).save(function(err){
                            if(err){
                                req.flash('error', 'Error in password forgot');
                                return res.redirect('/users/sign-in');;
                            }
                            
                        })
                    }
                        req.flash('success', 'New password has been sent on your mail');
                        return res.redirect('/users/sign-in');
                    
            });
        });
}