const mongoose = require ('mongoose')
const Article = require ('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test');


Article.findByIdAndUpdate("5e8ecaac757aa90d8073d0cf",{
    intro: "test d'introduction"
}, (err, post) => {
    console.log(err, post);
    
})

// Article.findById("5e8ecc2c3f91bc0e21ac57d1", (err, articles) => {
//     console.log(err, articles);
    
// })

// Article.find({
//     intro: "test d'introduction",

// }, (error, articles) => {
//     console.log(error, articles);
    
// })




// Article.create({
//     title : "Le Joker",
//     intro: "test d'introduction", 
//     content: "Critique sur le film Le Joker",
// }, (error, post) => {
//     console.log(error, post);
    
// }

// )
