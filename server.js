const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require("body-parser");
const gravatar   = require("gravatar");
const bcrypt     = require("bcryptjs");
const passport   = require("passport");
const app = express();
app.set('view engine','ejs');
const users = require("./routes/api/users");
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const client = require('./routes');

app.use(express.static(__dirname + '/assets'));

//M I D D L E - W A R E // BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//C O N F I G U R A T I O N // MONGO-DB

const db = require('./config/Keys').mongoURI;
//
//connecting to mongoDB
mongoose.connect(db,{useNewUrlParser : true})
    .then(console.log("Mongo Connected"))
    .catch(err => console.log(err));
//M I D D L E - W A R E // PASSPORT
app.use(passport.initialize());
//C O N F I G U R A T I O N // PASSPORT
require("./config/passport")(passport);



//_And_Using_Routes:________________\\

app.use("/api/users",users);
//

app.use('/api/profiles',profiles);
//

app.use('/api/posts',posts);

app.use('/',client);

//____________________________________________\\
const PORT = process.env.PORT || 5000 ;
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`);
});