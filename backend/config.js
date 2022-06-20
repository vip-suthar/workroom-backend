const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8000,
    MONGODB_URL: "mongodb+srv://workroom_backend:ZNY9Qpuyo7TGXZFx@cluster0.gswzb.mongodb.net/workroom_db?retryWrites=true&w=majority", // process.env.MONGODB_URL || "mongodb://localhost:27017/workroom_db"
    JWT_SECRET: "my-lovely-key"
};