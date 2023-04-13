const express= require('express');
const app=express();
const port =9000;


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server on ${port}`);
    }
    console.log(`Server is running on port :${port}` )
}
)
