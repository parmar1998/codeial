const User=require('../Models/users');

module.exports.profile=async function(request,response){
const user=await User.findById(request.params.id);

    return response.render('user_profile',{
        title:'User Profile',
        profile_user:user
    })
}

module.exports.update=async function(req,res){
  if(req.user.id==req.params.id){
   await  User.findByIdAndUpdate(req.params.id,req.body);
   return res.redirect('back');
  }
  else{
    return res.status(401).send('Unauthorized');
  }
}
//action for rendering sign up page
module.exports.signUp=function(request,response ){
  if(request.isAuthenticated()){
    response.redirect('/users/profile');
  }
    return response.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}
//action for rendering sign in page
module.exports.signIn=function(request,response ){

  if(request.isAuthenticated()){
    response.redirect('/users/profile');
  }
    return response.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}
module.exports.create = async function(req, res) {
    try {
      
        if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        await User.create(req.body);
        return res.redirect("/users/sign-in");
      }
      return res.redirect("back");
    } catch (err) {
      console.error(err);
      return res.redirect("back");
    }
  };

module.exports.createSession=function(request,response){
  request.flash('success','Logged in Successfully')  
  console.log("print");
    return response.redirect('/');
}
module.exports.destroySession = function(req, res,next){
  req.logout(function(err){
    req.flash('success','Logged Out Successfully')  
    return next(err);
  });
  return res.redirect('/');
}