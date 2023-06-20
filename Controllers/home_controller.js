const User=require('../Models/users')
const Post = require('../Models/post')


module.exports.home = async function (req, res) {
    try {
        // console.log(req.cookies);
        // res.cookie('user_id', 25);
        // populate the user of each post
        const users=await User.find({});
        const posts = await Post.find({}).sort('-createdAt').populate('user')
        
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }).
            exec();
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users:users
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}


