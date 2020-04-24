const    express = require("express");
const    exphbs = require("express-handlebars");
const    mongoose = require ("mongoose");
const    bodyParser = require ("body-parser") ;
const    fileupload = require ("express-fileupload"); 
const    expressSession = require("express-session");  
const    MongoStore = require ("connect-mongo"); 
const    connectFlash = require ("connect-flash");
const    {stripTags} = require("./helpers/hbs");
const    methodOverride = require ("method-override")

//controllers//////////////////////////////

//articles
const articleAddController = require ("./controllers/articleAdd");
const articlePostController = require ("./controllers/articlePost");
const articleSingleController = require ("./controllers/articleSingle");
const homePageController = require ("./controllers/homePage");
const articleDeleteController = require ("./controllers/articleDelete");
const articleEditController = require("./controllers/articleEdit");
const articlePutController = require("./controllers/articlePut");


//user
const userAdd = require("./controllers/userAdd")
const userRegister = require ("./controllers/userRegister")
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

//serveur/////////////////
const     app = express();

//method-override
app.use(methodOverride('_method'));

//mongoose
// const db = require ("./config/keys").MongoURI

mongoose
.connect("mongodb://localhost:27017/imaginer",
 ({ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }))
 .then(() => console.log("Connecter à Mongo"))
 .catch(err => console.log(err))

//connect-mongo
const mongoStore = MongoStore(expressSession);
//connect-flash
app.use(connectFlash());


var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//express-static
app.use(express.static('public'));


//express-session
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',   
    saveUninitialized: true,
    resave: false,
    // cookie: {securite: true},

    store: new mongoStore ({
        mongooseConnection: mongoose.connection}
    ),
}));



//Body-Parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//express-file-upload
app.use(fileupload());

//Handlebars
app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags,

    },
    defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('*', (req,res, next) => {
    res.locals.user = req.session.userId;
    // console.log(res.locals.user);
    next()
})


//post
//const Post = require("./database/models/Article")

//auth
const auth = require ('./middleware/auth')
app.use('/articles/add', auth)
const redirectAuthSuccess = require ('./middleware/redirectAuthSuccess')

//middleware///////////////////////////////
const articleValidPost = require ("./middleware/articleValidPost")
app.use("/articles/post", articleValidPost)


//route index////////////////
app.get("/", homePageController)

//controllers
//Articles
app.get("/articles/add",auth, articleAddController)
app.get("/articles/:id", articleSingleController)
app.post("/articles/post",auth, articleValidPost, articlePostController)
app.delete("/articles/:id",auth, articleDeleteController)
app.get("/articles/edit/:id",auth, articleEditController)
app.put("/articles/edit/:id", auth, articleValidPost, articlePutController)


//User
app.get("/user/add",redirectAuthSuccess, userAdd)
app.post("/user/register",redirectAuthSuccess, userRegister)
app.get ("/user/login",redirectAuthSuccess, userLogin)
app.post ("/user/loginAuth",redirectAuthSuccess, userLoginAuth)
app.get("/user/logout", userLogout)

//route contact////////////////////
app.get("/contact", (req, res) => {
    res.render ("contact")
})

//error 404
app.use((req, res) => {
    res.render("error404")
})

app.listen(4003, function() {
    console.log("Le serveur tourne sur le port 4003");
    
})



