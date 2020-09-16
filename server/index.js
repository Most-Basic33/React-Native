require('dotenv').config();
const path = require('path'),
express = require('express'),
session = require('express-session'),
auth = require('./authController'),
{SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env,
massive = require('massive'),
app = express();

const bodyParser = require('body-parser'),
socket = require('socket.io'),
cors = require('cors'),
http = require('http'),
server = app.listen(SERVER_PORT),
io = require('socket.io')({
  perMessageDeflate: false
})
.listen(server)

app.use(cors())
app.use(express.json())

app.use(session({  
      secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 26
    }
}))



// io.on("connection", socket => {
//     console.log("a user connected :D");
  
  
//     socket.on("message", msg => {
//       console.log(msg);
//       //socket.broadcast.emit will send to everybody execpt me
//      io.emit("message", msg);
//     });

// //     setInterval(()=>{
// // io.emit('image', 'some data')
// //     }, 1000)

//     socket.on('disconnect', () => {
//       console.log('User Disconnected');
//       io.emit('remove user')
//     })
//   });



// io.on('connection', socket => {
//   console.log('User Connected ')


//     // socket.on("message", msg => {
//     //   console.log(msg);
//     //   //socket.broadcast.emit will send to everybody execpt me
//     //  io.emit("message", msg);
//     // });


//   socket.on('join room', data => {
   
//     session.room = data 
    
//     socket.join(data.room, () => {
//       rooms = Object.keys(socket.rooms)
//       io.to(data.room).emit('room joined', {rooms})
//       console.log('room joined')
//     })

//   })
//   socket.on('message', ({name, message, roomId}) =>{

//     console.log( "Hit socket on message ",message, roomId)

//     if(!roomId && !roomId.rooms && !roomId.rooms[1]) return;
//      io.in(roomId.rooms[1]).emit('message from server', {name, message})
      
//   })

//   socket.on('message sent', data => {
//     // console.log(data)
//    // socket.broadcast.emit('message dispatched', data.message);
//    if(!data && !data.roomId && !data.roomId.rooms && !data.roomId.rooms[1]) return;
//      io.to(data.roomId.rooms[1]).emit('message data', {data: data.data});
//   })
//       socket.on('disconnect', () => {
//       console.log('User Disconnected');
//       io.emit('remove user')
//     })
//   });
 


  io.on('connection', socket => {
    console.log('User Connected');
    io.emit('message dispatched', 'hello');
   
    socket.on('join room', data => {
      console.log(data)
      session.room = data
       let rooms;
      console.log('room joined', data.room)
      socket.join(data.room, () =>{
       rooms = Object.keys(socket.rooms)
     console.log(rooms)
        io.to(data.room).emit('room joined', {rooms});
      });
    
    })
  
    
    socket.on('message', ({name, message, roomID}) =>{
  
      console.log( "Hit socket on message ",message, roomID)
  
      if(!roomID && !roomID.rooms && !roomID.rooms[1]) return;
       io.in(roomID.rooms[1]).emit('message from server', {name, message})
        
    })
  
    // socket.on('message sent', data => {
    //   // console.log(data)
    //  // socket.broadcast.emit('message dispatched', data.message);
    //  if(!data && !data.roomId && !data.roomId.rooms && !data.roomId.rooms[1]) return;
    //    io.to(data.roomId.rooms[1]).emit('message data', {data: data.data});
    // })
    socket.on('message sent',({ videos, roomID}) => {
      console.log(videos, roomID)
     // socket.broadcast.emit('message dispatched', data.message);
     if(!roomID && !roomID.rooms && !roomID.rooms[1]) return;
       io.in(roomID.rooms[1]).emit('message data', { videos});
    })
  
   
    // socket.on('message sent', data => {
    //   io.to(data.room).emit('message data', data);
    // })
    
    socket.on('disconnect', () => {
      console.log('User Disconnected');
    })
  });






massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db =>{
    app.set('db',db)
     
    console.log(`we are connected to our database-Welcome To Port ${SERVER_PORT} da player`)
})

app.post(`/api/register/`, auth.register)
app.post(`/api/login`, auth.login)
app.get(`/api/users/`, auth.getUsers)
