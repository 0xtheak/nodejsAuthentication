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
        // console.log(req.body);
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({email : req.body.email});
        // console.log(user);
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
            console.log(err);
            return;  
        }
        return res.redirect('back');

    }
}

module.exports.createSession = async function(req, res){
    

    // try{
    //     if(req.body.email == undefined){
    //         return res.status(401).json({
    //             message : "parameter missing"
    //         });
    //     }

    //     let user = await User.findOne({email : req.body.email});
    //     if(user){
            
    //         if(user.password!=req.body.password){
    //             return res.status(401).json({
    //                 message : "Invalid Email/Password"
    //             });
    //         }else {
                
    //             res.cookie('user_id', user.id);
    //             return res.redirect('/users/profile');
    //         }
    //     }else{
    //         return res.redirect('back');
    //     }
    // }catch(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     return res.status(401).json({
    //         message : "Internal server error"
    //     });
    // }
    return res.redirect('/users/profile');

}


module.exports.destroySession = function(req, res){
    req.logout((err) => {
        if(err){
            console.log('Failed to sign out');
            return next(err);
        }
        // req.flash('success', 'You Have Logged out!');
        return res.redirect('/users/sign-in');
    });
}