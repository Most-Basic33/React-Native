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
io = require('socket.io').listen(server);

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

io.on('connection', socket =>{
    console.log('User Connected');
   socket.emit('message', 'hello');

    socket.on('message', (message) =>{
        console.log(message)
       io.emit('message from server', {message})
    })

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
})












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
