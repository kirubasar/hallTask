const mongoose = require('mongoose');
const {HALL_URI} = require('./utils/config');

//import the app
const app = require('./app');

// connect to the database
mongoose.connect(HALL_URI)
   .then(()=>{
        console.log('Connected to MongoDB');

        // start the server
        app.listen(3004, ()=>{
            console.log('Server is running on port 3004: http://localhost:3004');
        })
    })
    .catch((err)=>{
        console.error('Error connecting to MongoDB', err.message);
    })