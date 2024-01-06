const express = require('express');

const app = express()

const port = process.env.PORT || 4000

app.get("/",(req,res) => {
    res.send("Hello World")
})
 
app.listen({port:PORT},async() => {
    console.log(`Server running on port ${PORT}`)
})
