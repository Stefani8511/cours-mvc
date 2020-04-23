module.exports = (req, res, next) => {
    if(!req.body) {
        return res.redirect('/')
    }    
    next()
        
}