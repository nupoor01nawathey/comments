const express     = require('express'),
      bodyParser  = require('body-parser'),
      path        = require('path'),
      expejs      = require('ejs'),
      mongoose    = require('mongoose');
      
const app         = express();

app.locals.moment = require('moment');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.send('TRYE');
});

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});