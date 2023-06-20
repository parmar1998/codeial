const Post = require('../../../Models/post')
const Comment = require('../../../Models/comment')
module.exports.index = async function (req, res) {

    let posts = await Post.find({}).sort('-createdAt').populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of Posts",
        post: posts
    });
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({ post: req.param.id });
            return res.json(200, {
                message: "post and comments delted successfully."
            });
        }
        else{
            return res.json(401,{
                message:"you cannot delete this post"
            })
        }

    } catch (err) {
        console.log('xxxxx', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
};