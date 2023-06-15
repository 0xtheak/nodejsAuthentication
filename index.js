require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');
const sassMiddleware = require('node-sass-middleware');

// sass middleware
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'

}));
app.use(expressLayouts);
app.use(express.urlencoded({extended : true}));
// cookie parser
app.use(cookieParser());

// setting the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));

// session store in database
app.use(session({
    name : process.env.SessionSecretName,
    // TODO change the secret before deployment in production mode
    secret : process.env.SessionSecret,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : MongoStore.create(
        {
            mongoUrl : process.env.mongoDBUrl,
            autoRemove : 'disabled'
     },
     function(err){
        if(err){
            console.log(err || 'connect-mongodb setup ok');
        }
     })
}));

// disabled ejs layout in home page
app.set("home", false);

// passwordjs 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash notification
app.use(flash());
app.use(customMWare.setFalsh);

// routes
app.use('/', require('./routes'));


app.listen(5000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('server has been started on port 5000');
})