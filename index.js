const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port =9090;
const expresslayouts=require('express-ejs-layouts');
const db=require('./Config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./Config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);

var sass = require('node-sass');



app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./Assets'));
app.use(expresslayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router

app.set('view engine','ejs');
app.set('views','./Views');

app.use(session({
    name:'CODEIAL',
    //TODO change the secret before  deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //mongo store is used to store the session cookie in the DB
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect-mongoDB setup ok')
        })}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',require('./Routes'));

app.post('/sign-out', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

  app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server on ${port}`);
    }
 console.log(`Server is running on port :${port}` )
}
);
