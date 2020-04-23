const Post = require("../database/models/Article")

module.exports = async(req,res) => {

    const article = await Post.findById({_id:req.params.id})

    if(req.session.userId) {
        return res.render("articles/edit", {article})
    }
    
    res.redirect("/user/login")
}








