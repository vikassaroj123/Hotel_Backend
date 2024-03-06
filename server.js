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

//Hotel Routes
const hotelRoutes = require('./Router/hotelsRoute');
app.use('/hotels', hotelRoutes);

//Room Routes
const roomRoutes = require('./Router/roomRoute');
app.use('/hotels', roomRoutes);

//Booking Routes
const bookingRoutes = require('./Router/bookingRoutes');
app.use('/booking', bookingRoutes);

//Hotel serch and filter

const hotelFilter = require('./Router/filterHotel');
app.use('/hotels', hotelFilter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on PORT:${PORT}`);
});