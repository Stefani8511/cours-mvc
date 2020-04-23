const Post = require("../database/models/Article")

module.exports =  async (req, res) => { 
    
    // const long = new ArrayBuffer(4);
    
    const posts = await Post
    .find({})
    .sort({_id: -1})
    .limit(4)
    // console.log(req.session);  
    // console.log(posts);

      
    
    res.render("index", {posts});
}