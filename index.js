const express= require('express');
const app=express();
const port =9000;
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
