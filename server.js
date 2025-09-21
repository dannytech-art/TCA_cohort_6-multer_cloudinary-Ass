const { log } = require('console')
const express = require('express')
const port = process.env.PORT
require('./config/database')
const userRouter = require('./routes/userRouter')
const app = express()
app.use(express.json())

app.use(userRouter)

app.listen(port, ()=>{
    log(`app is running on port: ${port}`)
})