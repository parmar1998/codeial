const Post =require('../Models/post')

module.exports.create= async function(req,res){
   let user= Post.create({
        content:req.body.content,
        user:req.user._id
    });
    if(user){
        return res.redirect('back');
    }
    return "failed";
}