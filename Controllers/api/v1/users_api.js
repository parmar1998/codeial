const User = require('../../../Models/users');
const jwt = require('jsonwebtoken');

//to run this file you need a route
module.exports.createSession = async function (request, response) {
    try {
        let user = await User.findOne({ email:request.body.email })
       //if user details dont match then
        if (user.password != request.body.password || !user) {
            //422 is invalid input
            return response.json(422, {
                message:"Invalid username or password"
            })
        }
        // if user details matches then 
        return response.json(200,{
            message:"Sign in Successfull, Here 's your token please keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn: '100000'})
            }
        })
    }
    catch (err) {
        console.log('*****', err);
        return response.json(500, {
            message: "Internal Server Error"
        });
    }
}