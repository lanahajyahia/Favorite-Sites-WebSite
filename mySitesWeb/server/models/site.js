const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true
    },
    siteName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        type: Array
    }

})

// export schema and create a module - takes the name of the module and the schema
// the reason we need thi, when we export this, it will let us interact with the db directly using the schema 
module.exports = mongoose.model('Site', siteSchema)