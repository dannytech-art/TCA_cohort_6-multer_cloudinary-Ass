const { log } = require('console')
const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.MONGODB_URI
mongoose.connect(DB).then(()=>{
    log(`db connected`)
}).catch((error)=>{
    log(`error connecting to db: ${error}`)
})