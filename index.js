const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

dotenv.config();
// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
// connect to db
mongoose.connect(process.env.DB_CONNECT,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true 
    },
    ()=> console.log('connected to database')
);

//Midddleware 
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen( 3000, (req, res) =>{
    console.log('server is listening')
})
