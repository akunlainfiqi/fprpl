const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
const routes = {
    users: require('./routes/users.js'),
}

const connectDB = (url)=>{
    return mongoose.connect(url);
}

const start = async()=>{
    try {
        await connectDB(process.env.DBURL);
        app.listen(PORT, () =>{
            console.log(`listening on port ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

start();