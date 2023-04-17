const user = require('../models/user');
// const {spawn} = require('child_process');


module.exports.home = function(req, res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
  }
    
    return res.render('home', {
        title : 'Home Page | Nodejs Authentication'
    });
}