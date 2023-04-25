
const Post=require('../Models/post')
module.exports.home= async function(req,resp)
{
    try{
        //populate the user from each post too
        const posts=await Post.find({}).populate('user');
        resp.render('home',{
            title:"Codial | Home",
            posts:posts});
        }
    catch(err){
        console.error(err);
        resp.Status(500).send("Internal Server Error")
    }
}