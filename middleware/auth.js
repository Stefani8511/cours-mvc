const User = require ("../database/models/User")

module.exports = (req, res, next) => {

    //connecte-toi dans base de données
    User.findById(req.session.userId, (error, user) => {
        if(error || !user){
            return res.redirect('/')
        }
        next()
    })
    //verifie le user

    // si il est dans la base de données

    // sinon tu le rediriges





}