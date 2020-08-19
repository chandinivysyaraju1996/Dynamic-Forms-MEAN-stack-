const path =require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const companyRoutes =require('./routes/company');

mongoose.connect("mongodb+srv://chandini:X6KoCFUsWHpDPm4W@cluster0-lh2uq.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to db");
})
    .catch((err) => {
        console.log(err)
        console.log("connection failed")
    })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers',
        "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS")

    next();
})



app.use("/api/company",companyRoutes);
module.exports = app;
