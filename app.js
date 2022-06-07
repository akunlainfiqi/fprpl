const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

require("dotenv").config();
require('./passport/local-auth');
require('./passport/jwt');


const PORT = process.env.PORT || 8000;
const app = express();
const connectDB = (url)=>{
    return mongoose.connect(url);
}
const routes = {
    root: require('./routes/root.routes'),
    users: require('./routes/users.routes'),
    transactions: require('./routes/transactions.routes'),
    events: require('./routes/events.routes'),
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret : "capeknguli",
    resave : true,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


for (const [routeName, routeDir] of Object.entries(routes)){
    if(routeName == "root") app.use('/',routes.root)
    else app.use(`/${routeName}`,passport.authenticate('jwt', { session: false }), routes[routeName]);
    // else app.use(`/${routeName}`,routes[routeName]);
}

const start = async()=>{
    try {
        await connectDB(process.env.DBURL);
        app.listen(PORT, ()=>{
            console.log('connect to port ' + PORT);
        })
    } catch (err) {
        console.error(err)
    }
}

start();

module.exports = app;