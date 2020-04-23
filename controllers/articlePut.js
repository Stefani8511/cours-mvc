// const    path = require ("path")
const Post = require("../database/models/Article")


module.exports = (req, res) => {

    // const article = await Post.findById({ _id: req.params.id });
    // const { image }  = req.files;
    // const uploadFile = path.resolve(__dirname,'..',  "public/covers", image.name);

    // image.mv(uploadFile, (error) => {
    Post.update(
        { _id: req.params.id },
        {
            title: req.body.title,
            content: req.body.content,
            // image:  `/covers/${image.name}`,
            author: req.body.author,
        },

        { multi: true },

        function (error) {
            if (!error) {
                res.redirect("/")
            } else {
                res.send("error")
            }
        }
    )
        
    


}