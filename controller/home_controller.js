const user = require('../models/user');

// home page rendering
module.exports.home = function(req, res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
  }
    
    return res.render('home', {
        title : 'Home Page | Nodejs Authentication',
        layout : 'home',
    });
}