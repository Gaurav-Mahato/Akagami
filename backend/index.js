const express = require('express');
const connectDB = require('./config/db.js')
const app = express()
const cors = require('cors')
// const path = require('path')

const userRoutes = require('./routes/userRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
// const uploadRoutes = require('./routes/uploadRoutes.js')


app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ['POST','GET'],
    credentials: true 
}))
app.use(express.json())

// const __dirname = path.resolve()
// app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

connectDB()

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use("/api/users",userRoutes) 
app.use("/api/chat",chatRoutes)
// app.use("/api/uploads",uploadRoutes)

app.listen({port:8080},async() => {
    console.log(`Server running on port 8080`)
})

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
});

socket.on("setup", (user)=>{
    socket.join(user.data._id);
    socket.emit("connected");
});

socket.on("join chat",(room)=>{
    socket.join(room);
})

socket.on("newMessage",(newMessageStatus)=>{
    var chat = newMessageStatus.chat;
    if(!chat.users){
        return console.log("chat.users not defined");
    }
    chat.users.array.forEach(user => {
        if(user._id == newMessageStatus.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
});