const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./config/db.js')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
connectDB()

const port = process.env.PORT || 4000

app.get("/",(req,res) => {
    res.send("Hello World")
})
 
app.listen({port:4000},async() => {
    console.log(`Server running on port 4000`)
})
