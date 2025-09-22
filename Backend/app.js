const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./Db/db');
const userRoutes = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.route');
// middleware must be registered before routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// debug middleware: logs content-type and parsed body
app.use((req, res, next) => {
    console.log('DEBUG Content-Type:', req.headers['content-type']);
    console.log('DEBUG parsed body:', req.body);
    next();
});

// routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

// keep DB connect here or call it from server.js before listen
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;