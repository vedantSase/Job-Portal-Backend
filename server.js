//   importing packages
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();

//  importing local modules 
const db = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');

const app = express();

//  using middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());


app.use('/api/user', authRoutes);
app.get('/', function (req, res) {
    res.send('Hello World!');
});



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000...'.bgGreen.bold.white);
});