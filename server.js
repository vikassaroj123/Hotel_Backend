const express = require('express')
const app = express()

//Database onnection
const db = require('./db');
const passport = require('passport');

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//User Routes
const userRoutes = require('./Router/userRoute');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on PORT:${PORT}`);
});