
const Post=require('../Models/post')
module.exports.home= async function(req,resp)
{
    try{
        const posts=await Post.find({});
        resp.render('home',{
            title:"Codial | Home",
            posts:posts});
        }
    catch(err){
        console.error(err);
        resp.Status(500).send("Internal Server Error")
    }
}