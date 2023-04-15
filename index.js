const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port =9000;
const expresslayouts=require('express-ejs-layouts');
const db=require('./Config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./Assets'));
app.use(expresslayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router
app.use('/',require('./Routes'));
app.set('view engine','ejs');
app.set('views','./Views')
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server on ${port}`);
    }
 console.log(`Server is running on port :${port}` )
}
)
