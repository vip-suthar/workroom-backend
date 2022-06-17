const crypto = require("crypto");
const router = require('express').Router();
const JwtHandler = require('../utility/jwtHandler');
const UserSchema = require('../models/userSchema');

router.post("/", async function (req, res) {
    try {
        // check if the user for the given email already exists in database
        if (await UserSchema.exists({ email: req.body.email })) { // if user already exists,
            // send an unsuccessful attempt indication to client 
            res.send({
                success: false,
                message: "user already exists"
            });
        }
        else { // otherwise create a new user entry in database with
               // salt and hash for password verification at later times
            let inputPass = req.body.password;
            let salt = crypto.randomBytes(10).toString('base64');
            let hash = crypto.createHash('sha256')
                .update(inputPass + salt)
                .digest('hex');

            // store in database
            let user = new UserSchema({
                "name": req.body.name,
                "email": req.body.email,
                "hash": hash,
                "salt": salt
            });
            await user.save();

            // use this payLoad to create a JWT Token so that later on, authorization of user
            // can be verified through it's signature verification using "JWT_SECRET" in 'config.js'
            // and then send response along with this JWT Token
            let payLoad = {
                "_id": user._id,
                "name": user.name,
                "email": user.email,
                "expires_in": 24 * 60 * 60
            };
            payLoad.token = JwtHandler.createToken(payLoad);
            res.send(payLoad);
        }
    } catch (error) { // if anything goes wrong
        res.status(500).send(error);
    }
});

module.exports = router;