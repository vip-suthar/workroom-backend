const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "User" },
    email: { type: String, required: true, unique: true, index: true, dropDups: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);