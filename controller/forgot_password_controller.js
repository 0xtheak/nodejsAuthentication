const User = require('../models/user');
const forgotPassMailer = require('../mailers/forgot-password-mailer');
const crypto = require('crypto');
const forgotPassEmailWorker = require('../workers/forgot_password_email_worker');
const queue = require('../config/kue');
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports.passwordChange = function(req, res){
    console.log(req.body);
    const userId = req.body.user_id;
    if(req.body.new_password !== req.body.confirm_password){
        console.log('from profile');
        return res.redirect('back');
    }
    User.findById(userId, (err, user)=> {
        if(err){
            console.log('error in password change', err);
            return;
        }
        if(user){
            console.log(user);
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
    return res.redirect('back');
}

module.exports.forgotPassword = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('forgot_password', {
        title : 'Forgot Password'
    });

}

module.exports.passwordReset = function(req, res){
    
        
        if(req.body.email == undefined){
            return res.redirect('/users/sign-in');
        }
        let pass = crypto.randomBytes(20).toString('hex');

    User.findOneAndUpdate({email : req.body.email},{password: pass}, { "new": true}, function(err, user){
        if(err){
            console.log('error in password forgot', err);
            return;
        }
            if(user){
                
                let job = queue.create('forgotPass-emails', user).save(function(err){
                    if(err){
                        console.log('error in creating a queue', err);
                    }
                    
                })
            }
                return res.redirect('/users/sign-in');
            
    });

}