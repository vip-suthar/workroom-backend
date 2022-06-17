const jwt = require('jsonwebtoken');
const config = require('../config');

// A simple utility class to provide functionalities for creation and verification of a JWT Token

class JwtHandler {
    constructor() { }

    static createToken(data) {
        try {
            const token = jwt.sign(data, config.JWT_SECRET);
            return token;
        } catch (error) {
            return error;
        }

    }

    static verifyToken(token) {
        try {
            const verified = jwt.verify(token, config.JWT_SECRET);
            return verified;
        } catch (error) {
            return error;
        }
    }
}

module.exports = JwtHandler