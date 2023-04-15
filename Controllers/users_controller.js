const User=require('../models/users');
module.exports.profile=function(request,response){
    return response.render('user_profile',{
        title:'User Profile'
    })
}
//action for rendering sign up page
module.exports.signUp=function(request,response ){
    return response.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}
//action for rendering sign in page
module.exports.signIn=function(request,response ){
    return response.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}
//action for rendering user data
module.exports.create= async function(req,res){
    if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    await User.create(req.body);
    return res.redirect("/users/sign-in");
  }
  return res.redirect("back");
}

//action for rendering the session after signing in the user
// module.exports.create=function(request,response){
//     //todo Session 
//  }