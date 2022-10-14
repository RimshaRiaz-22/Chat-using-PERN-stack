const PORT = 4000
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path')
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
const socket = require("socket.io");


// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.send('<h1>Working</h1>')
})
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////User APIS////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.use('/user',
    require('./apis/users/register'),
    require('./apis/users/setAvatar'),
    require('./apis/users/login'),
    require('./apis/users/getAllusers'),
    require('./apis/users/delete'),
)
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Msg APIS////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.use('/msg',
    require('./apis/msgs/addMsg'),
    require('./apis/msgs/getMsgs'),
)
const server = app.listen(PORT, () => {
    console.log(`Server is started in PORT no ${PORT}`)
});
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });

  