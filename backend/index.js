const express = require('express');
const connectDB = require('./config/db.js')
const app = express()
const cors = require('cors')
// const path = require('path')

const userRoutes = require('./routes/userRoutes.js')
// const uploadRoutes = require('./routes/uploadRoutes.js')


app.use(cors())
app.use(express.json())

// const __dirname = path.resolve()
// app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

connectDB()

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use("/api/users",userRoutes) 
// app.use("/api/uploads",uploadRoutes)

app.listen({port:4000},async() => {
    console.log(`Server running on port 4000`)
})
