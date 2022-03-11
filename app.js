const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require("dotenv").config();
require('./passport/local-auth');

const PORT = process.env.PORT || 8080;
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

app.use(express.urlencoded({extended: false}));
app.use(session({
    secret : "capeknguli",
    resave : true,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


for (const [routeName, routeDir] of Object.entries(routes)){
    if(routeName == "root") app.use('/',routes.root)
    else app.use(`/${routeName}`, routes[routeName]);
}

const start = async()=>{
    try {
        await connectDB(process.env.DBURL);
        app.listen(PORT)
    } catch (err) {
        console.error(err)
    }
}

start(console.log());

module.exports = app;