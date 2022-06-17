const express = require('express');
const cors = require('cors');
const config = require('./config');
const connectDB = require('./dbConnect');
const userRoute = require('./routes/userRoute');
const signInRoute = require('./routes/signInRoute');
const signUpRoute = require('./routes/signUpRoute');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/user', userRoute);
app.use('/sign-in', signInRoute);
app.use('/sign-up', signUpRoute);

// listening
app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
});
