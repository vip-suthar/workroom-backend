const mongoose = require('mongoose');
const config = require('./config');
const mongodbUrl = config.MONGODB_URL;

mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch((error) => console.log(error.reason));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Database ready to be connected");
});

module.exports = db;