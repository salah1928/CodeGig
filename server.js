const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require("body-parser");
const gravatar   = require("gravatar");
const bcrypt     = require("bcryptjs");
const passport   = require("passport");
const app = express();

const users = require("./routes/api/users");
const profiles = require('./routes/api/profiles');
const shops = require('./routes/api/shops');

//M I D D L E - W A R E // BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//C O N F I G U R A T I O N // MONGO-DB
const db = "mongodb://localhost/___SHOP___";
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

app.use('/api/shops',shops);

//____________________________________________\\
const PORT = process.env.PORT || 5000 ;
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`);
});