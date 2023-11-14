const express = require('express')
const { createServer } = require("http");
const user_route = require('./routes/userRoute')
const admin_route = require('./routes/adminRoute')
const path = require('path')
const myEnv = require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const PORT = 3000;
const httpServer = createServer(app);
const { Server } = require('socket.io')


app.use(bodyParser.json());
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:4200',
}))


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/', user_route)
app.use('/admin', admin_route)
app.use('/public', express.static(path.join(__dirname, 'public')));



const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:4200',
  }
});
httpServer.listen(PORT);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
  });
});

// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });