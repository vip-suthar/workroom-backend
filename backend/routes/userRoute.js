const router = require('express').Router();
const JwtHandler = require('../utility/jwtHandler');
const UserSchema = require('../models/userSchema');

const authUser = (token) => {
    if (token) {
        let verification = JwtHandler.verifyToken(token);

        // check if the signature is verified
        if (verification.name && verification.message) return false;

        // check if the token is expired or not
        let currDateInSec = Math.floor((Date.now()) / 1000);
        if (currDateInSec - verification.iat > verification.expires_in) return false;

        // if everything is alright
        return true;
    } else return false;
}

router.get("/", async function (req, res) {
    try {
        // check if user is authorized
        if (authUser(req.headers.authorization)) {
            // if user is authorized
            // get all users from database and send the response
            let users = await UserSchema.find({});
            let response = users.map(user => {
                return {
                    "_id": user._id,
                    "name": user.name,
                    "email": user.email,
                };
            });
            res.send(response);
        } else { // unsuccessful authorization
            res.send({
                success: false,
                message: "Authorization Error"
            });
        }
    } catch (error) { // if anything goes wrong
        res.status(500).send(error);
    }
})

router.get("/:id", async function (req, res) {
    try {
        // check if user is authorized
        if (authUser(req.headers.authorization)) {
            // if user is authorized
            // get the user from database whose id is mentioned in params, and send the response
            let user = await UserSchema.findById(req.params.id);
            if (user) {
                res.send({
                    "_id": user._id,
                    "name": user.name,
                    "email": user.email
                });
            } else { // otherwise send an unsuccessful attempt indication to client
                res.send({
                    success: false,
                    message: "user does not exist"
                });
            }
        } else { // unsuccessful authorization
            res.send({
                success: false,
                message: "Authorization Error"
            });
        }
    } catch (error) { // if anything goes wrong
        res.status(500).send(error);
    }
});

// Update a user
router.patch("/:id", async function (req, res) {
    try {
        // check if user is authorized
        if (authUser(req.headers.authorization)) {
            // if user is authorized
            // get the user from database whose id is mentioned in params
            // if user exists in database, update it and send the response
            let user = await UserSchema.findById(req.params.id);
            if (user) {
                await UserSchema.findByIdAndUpdate(req.params.id, { name: req.body.name });
                res.send({
                    "_id": user._id,
                    "name": req.body.name, // so that client gets updated information
                    "email": user.email
                });
            } else { // otherwise send an unsuccessful attempt indication to client
                res.send({
                    success: false,
                    message: "user does not exist"
                });
            }
        } else { // unsuccessful authorization
            res.send({
                success: false,
                message: "Authorization Error"
            });
        }
    } catch (error) { // if anything goes wrong
        res.status(500).send(error);
    }
});

// Delete a user
router.delete("/:id", async function (req, res) {
    try {
        // check if user is authorized
        if (authUser(req.headers.authorization)) {
            // if user is authorized
            // check if the user exists in database whose id is mentioned in params
            // if user exists in database, delete it and send the response
            if (await UserSchema.exists({ "_id": req.params.id })) {
                await UserSchema.findByIdAndDelete(req.params.id);
                res.send({});
            } else { // otherwise send an unsuccessful attempt indication to client
                res.send({
                    success: false,
                    message: "user does not exist"
                });
            }

        } else { // unsuccessful authorization
            res.send({
                success: false,
                message: "Authorization Error"
            });
        }
    } catch (error) { // if anything goes wrong
        res.status(500).send(error);
    }
});


module.exports = router;