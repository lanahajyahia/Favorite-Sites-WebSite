require('dotenv').config()

const express = require('express');
const app = express();
// configure mongoose
const mongoose = require('mongoose');
// const cors = require('cors');
// const cors = require('cors')
//only get,post 
// app.use(cors({ //origin:*  from any site 
//     origin: 'http://localhost:3000'
// }))

// connect to db

const url = process.env.DATABASE_URL;

// const connectionParams = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }
mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`);
    })
    // mongoose.connect(process.env.DATABASE_URL)
    //     // mongoose.Promise = global.Promise;
    // console.log(process.env.DATABASE_URL)
    // const db = mongoose.connection
    // db.on('error', (error) => console.error(error))
    // db.on('open', () => console.log("connected to db"), () => { console.log("Connected to DB") })

// set server to accept json, this runs once server get request but before getting it to the browser
app.use((express.json()))

// we use this to access routes of pur sites for restfull api
// 'localhost:3000/sites/anything'
const sitesRouter = require('./routes/sites')
app.use('/sites', sitesRouter)


// server start at port 3000
app.listen(3000, () => console.log("Server Started"))