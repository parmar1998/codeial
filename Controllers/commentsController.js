const Comment=require('../Models/comment');
const Post=require('../Models/post');
module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);

        if (post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.destroy=async function(req,res){
    try{
      const comment=await Comment.findById(req.params.id);
      if(comment.user==req.user.id){
        let postId=comment.post;
        await comment.deleteOne();
        const  post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
        return res.redirect('back');
      }
      else{
        return res.redirect('back');
      }
    }
    catch(err){
        console.error(err);
        return res.redirect('back');
    }
  }
