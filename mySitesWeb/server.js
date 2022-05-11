require('dotenv').config()

const express = require('express');
var cors = require('cors')
var app = express()

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
}
app.use(cors(corsOptions));
// configure mongoose
const mongoose = require('mongoose');

// connect to db

const url = process.env.DATABASE_URL;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`);
    })

// set server to accept json, this runs once server get request but before getting it to the browser
app.use((express.json()))

// we use this to access routes of pur sites for restfull api
// 'localhost:3000/sites/anything'
const sitesRouter = require('./routes/sites')
app.use('/sites', sitesRouter)

app.listen(3000, () => console.log("Server Started"))