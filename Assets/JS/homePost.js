{
    //method to submit the form data for new post using AJAX
    let createPost = function () {
        let newpostform = $('#new-post-form');
        newpostform.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newpostform.serialize(),//converts data to JSON
                success: function (data) {
                    let newpost = createnewwpostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newpost);
                    deletePost($( ' .delete-post-button',newpost))//newpost will have .delete-post-button this class inside it
                }, error: function (error) {
                    console.log(error.responsetext);
                }
            })
        })
    }
    //method to create a post in DOM
    let createnewwpostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
          
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                </small>
               
        </p>
        <p>
        ${post.content}
                <br>
                <small>
                ${post.user.name}
                </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment" required>
                    <!-- Id of the post where comment needs to be added -->
                    <input type="text" name="post" value="${post.id}">
                    <input type="submit" value="Add Comment">
                </form>
              
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    
    </li>`)
    }

    //method to delete a post from DOM - sending a post id (blocks the default send it via AJAX)
    let deletepost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function () {
                    $(`#post-$(data.data.post_id)`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}