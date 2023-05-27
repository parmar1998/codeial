const Post = require('../Models/post')
const Comment = require('../Models/comment');
module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user.id
        });
        req.flash('success','Post Published!');
        return res.redirect('back');
    } catch (err) {
        // console.error(err);
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id);
      
      if (post.user == req.user.id) {
        await post.deleteOne();
        await Comment.deleteMany({ post: req.param.id });
        req.flash('success','post and related comment deleted!');
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      req.flash('error','You cannot delete this post!');
      return res.redirect('back');
    }
  };

 
  

