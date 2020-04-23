const Post = require("../database/models/Article")


module.exports = async (req, res) => {

    const article = await Post.findById({_id:req.params.id})
       
    res.render("articles", {article})
}