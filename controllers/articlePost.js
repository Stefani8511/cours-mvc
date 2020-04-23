const    path = require ("path")
const    Post = require("../database/models/Article")

module.exports = (req, res) => {

    const { image } = req.files;
    const uploadFile = path.resolve(__dirname,'..',  "public/covers", image.name);

    image.mv(uploadFile, (error) => {
     Post.create(
         {
             ...req.body,
             image: `/covers/${image.name}`
         },    
             (error, post) => {
        res.redirect("/");
    })
    }) 
    console.log(req.files);
    console.log(req.body);
    
       
}