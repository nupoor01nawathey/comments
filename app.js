const express               = require('express'), 
      bodyParser            = require('body-parser'), // json
      path                  = require('path'), // public folder related
      expejs                = require('ejs'),
      morganLogger          = require('morgan'),
      mongoose              = require('mongoose'),
      expsession            = require('express-session'), // user related
      passport              = require('passport'), // user related
      passportLocal         = require('passport-local'), // user related
      passportLocalMongoose = require('passport-local-mongoose'); // user related
      
const app                   = express();

app.locals.moment           = require('moment');    // display comment add time

const User                  = require('./models/user');

const userRoute             = require('./routes/usermanage'),
      indexRoute            = require('./routes/index'),
      addQuestionRoute      = require('./routes/add-question');
      // commentsRoute      = require('./routes/comments');
    
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));


app.use(expsession ({
    secret: 'ChuChUyA is the CuTesT CAT evEr!',
    resave: false,
    saveUninitialized: false // session object will not be stored in the session store
}));

// To use Passport in an Express, configure it with the required passport.initialize() middleware
// If your application uses persistent login sessions passport.session()middleware must also be used
app.use(passport.initialize());
app.use(passport.session());


// coming from passportLocalMongoose to tell passport for using local strategy to authenticate user data
// taking data from sessions which is encoded and unencoded 
// (the function is from passportLocalMongoose which we have imported
passport.use(new passportLocal(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });


app.use('/user', userRoute);
app.use('/', indexRoute);
app.use('/q', addQuestionRoute);


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});