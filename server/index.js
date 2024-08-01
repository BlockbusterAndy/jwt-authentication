const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const AuthRoutes = require('./Routes/AuthRoutes');
const cookieParser = require('cookie-parser');

const port = 3000;

mongoose.connect('mongodb://localhost:27017/jwt-auth').then(() => {
    console.log('Database Connection Successful');
}).catch((err) => {
    console.log('Database Connection Failed');
    console.log(err.message);
});

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/", AuthRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
