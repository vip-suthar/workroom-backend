const express = require('express');
const cors = require('cors');
const config = require('./config');
const connectDB = require('./dbConnect');
const userRoute = require('./routes/userRoute');
const signInRoute = require('./routes/signInRoute');
const signUpRoute = require('./routes/signUpRoute');
var path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/user', userRoute);
app.use('/sign-in', signInRoute);
app.use('/sign-up', signUpRoute);

app.use(express.static(path.join(__dirname + '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname +`/../frontend/build/index.html`));
});

// listening
app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
});
