const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.profile =  function(req, res){
    return res.render('profile', {
                        title : 'Profile',
                    });
   
}

// rendering Sign Up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        console.log('in the sign up')
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title : 'Sign Up | Nodejs Authentication'
    });
}

// rendering Sign In page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title : 'Sign In | Nodejs Authentication'
    });
}

// user sign up
module.exports.create = async function(req, res){
    try{
        
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({email : req.body.email});
        
        if(!user){
            let hashPassword = new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if(err) reject(err);
                    resolve(hash);
                })
            });
            hashPassword.then(async (result)=>{
                if(result){
                    let newUser = await User.create({
                        FirstName : req.body.FirstName,
                        LastName : req.body.LastName,
                        email : req.body.email,
                        password : result
                    });
                    console.log(newUser);
                    return res.redirect('/users/sign-in');
                }
                
            });
            
        }else{
            return res.redirect('back');
        }
        
    }catch(err){
        if(err){
            return;  
        }
        return res.redirect('back');

    }
}

module.exports.createSession = async function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/users/profile');

}


module.exports.destroySession = function(req, res){
    req.logout((err) => {
        if(err){
            
            return next(err);
        }
        req.flash('success', 'You Have Logged out!');
        return res.redirect('/users/sign-in');
    });
}