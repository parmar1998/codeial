// format for making the method
//module.exports.actionName=function(request,response){}

module.exports.home=function(request,response){
    console.log(request.cookies)
    // response.cookie('user_id',25);
    return response.render('home',{
        title:"Home"
    })
}