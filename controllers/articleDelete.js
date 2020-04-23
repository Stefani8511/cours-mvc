const Post = require("../database/models/Article")


module.exports = async (req, res) => {

   const article = await Post.findById({_id:req.params.id});

   
           
    article.deleteOne ({_id:req.params.id}, function(error) {

        if(!error){
            res.redirect("/")
        }else{
            res.send("error")
        }
    })
      
       
} 
   
// module.exports = async (req, res) => {

//     const article = await Post

//     .findByIdAndRemove(req.params.id)
//     .then(() => {
//         "supprimer"
//     })
//     res.json({article})
// }

   