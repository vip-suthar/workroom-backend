const crypto = require("crypto");
const router = require('express').Router();
const JwtHandler = require('../utility/jwtHandler');
const UserSchema = require('../models/userSchema');

router.post("/", async function (req, res) {
    try {
        // get the user for the given email from database
        let email = req.body.email;
        let [user] = await UserSchema.find({ email: email });
        if (!user) { // if user does not exists,
            // send an unsuccessful attempt indication to client
            res.send({
                success: false,
                message: "User Does Not Exist"
            });
        }
        else { // otherwise send 
            let hash = user.hash;
            let salt = user.salt;

            let inputPass = req.body.password;

            let newHash = crypto.createHash('sha256')
                .update(inputPass + salt)
                .digest('hex');

            if (hash == newHash) { // if hash in database matches with new hash created through
                                   // password by client and salt from database
                
                // use this payLoad to create a JWT Token so that later on, authorization of user
                // can be verified through it's signature verification using "JWT_SECRET" in 'config.js'
                // and then send response along with this JWT Token
                const payLoad = {
                    "_id": user._id,
                    "name": user.name,
                    "email": user.email,
                    "expires_in": 24 * 60 * 60
                }
                payLoad.token = JwtHandler.createToken(payLoad);
                res.send(payLoad);
            } else { // otherwise send an unsuccessful attempt indication to client
                res.send({
                    success: false,
                    message: "Invalid Email or Password"
                });
            }
        }

    } catch (error) { // if anything goes wrong
        res.status(500).send(error);
    }
});

module.exports = router;