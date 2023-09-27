const express = require('express')
const user_route = require('./routes/userRoute')
const path = require('path')
const admin_route = require('./routes/adminRoute')
const myEnv = require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://vishnupv:yTveNZfmyI5Sd0KO@cluster0.oclzgxu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/', user_route)
//app.use('/admin', admin_route)
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



