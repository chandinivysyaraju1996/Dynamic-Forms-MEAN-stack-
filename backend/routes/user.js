const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        console.log(hash);
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(result => {
            res.status(200).json({
                message: 'User created!',
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
})
router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        console.log(user)
        if (!user) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
        if (!result) {
            return res.status(401).json(
                { message: 'Auth failed' }
            );
        }
        console.log(result)
        const token = jwt.sign(
            {
                email: fetchedUser.email,
                userId: fetchedUser._id
            },
            'secret_for_hashing',
            {
                expiresIn: '1h'
            }
        );
        console.log(token)
        res.status(200).json({ token: token, expiresIn: 3600,userId:fetchedUser._id })

    }).catch(err => {
        console.log(err);
        return res.status(401).json(
            { message: 'Auth failed' }
        );
    });
});
module.exports = router;
