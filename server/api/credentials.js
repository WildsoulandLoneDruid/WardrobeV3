const { Router } = require('express');
const bodyParser = require('body-parser');

const UserEntry = require("../models/user");
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const router = Router();
const saltRounds = 10;

router.post('/userInfo', async(req, res, next) => {
    try {
        console.log(' Getting user Information');
        const {
            _id
         } = req.body;
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "_id": _id,
        });
        if (credentialCheck == null) {
            res.status(400);
            var error = 'User does not exist';
            next(error);
        }
        else
        {
            res.json(credentialCheck);
        }
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

router.post('/register', async(req, res, next) => {
    try {
        var passwordHash = '';
        const {
           fullName,
           primaryEmail,
           secondaryEmail,
           password,
           securityQuestion1,
           securityQuestion2,
           securityQuestion1Answer,
           securityQuestion2Answer
        } = req.body;
        // bcrypt.genSalt(saltRounds, function(err, salt) {
        //     bcrypt.hash(password, salt, function(err, hash) {
        //     // returns hash
        //     passwordHash = hash;
        //     });
        //   });
          //console.log(passwordHash);
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "email.primaryEmail": primaryEmail
        });
        if (credentialCheck != null) {
            var error = 'User already exist';
            console.log(error);
            res.status(400);
            next(error);
        } else {
            console.log('Regeistering new user');
            var userInstance = new UserEntry({
                fullName: fullName,
                email: [{
                    primaryEmail: primaryEmail,
                    secondaryEmail: secondaryEmail,
                }],
                security: [{
                    password: password,
                    securityQuestion1: securityQuestion1,
                    securityQuestion1: securityQuestion1Answer,
                    securityQuestion2: securityQuestion2,
                    securityQuestion2: securityQuestion2Answer,
                }],
            });
            try {
                await userInstance.save();
                var result = userInstance.fullName + ' has been succesfully added to the database'
                console.log(result);
                res.json({sessionId:userInstance._id});
            } catch (error) {
                next(error)
            }
        }
    } catch (error) {
        next(error);
    }
});
router.post('/changePassword', async(req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const credentialCheck = await UserEntry.findOne({
            "email.primaryEmail": email.toLowercase()
        }).excec(function(err, docs) {
            if (err) {
                next(err);
            }
        });
        if (credentialCheck[0].password.localeCompare(password) == 0) {
            err = "Password is the same as the previous password";
            next(err);
        } else {
            await userModel.findOneAndUpdate({
                "email": email
            }, {
                "$set": {
                    "security.$.password": password,
                }
            }.exec(function(err, docs) {
                if (err) {
                    next(err);
                    res.status(400);
                } else {
                    console.log('Updated Password: ' + docs);
                    res.status(200);
                }
            }));
        }
    } catch (error) {
        next(error);
    }
});
router.post('/login', async(req, res, next) => {
    try {
        console.log("login");
        var passwordHash = '';
        const {
            email,
            password
        } = req.body;
        // bcrypt.genSalt(saltRounds, function(err, salt) {
        //     bcrypt.hash(password, salt, function(err, hash) {
        //     // returns hash
        //     passwordHash = hash;
        //     });
        //   });
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "email.primaryEmail": email,
            "security.password": password
        });
        //console.log(credentialCheck);
        if (credentialCheck == null) {
            res.status(400);
            var error = 'User does not exist';
            next(error);
        }
        else
        {
            res.json({sessionId:credentialCheck._id});
        }
    } catch (error) {
        next(error);
    }
});
router.post('/forgotPassword', async(req, res, next) => {
    try {
        console.log('forgot password endpoint');
        const {
            email,
            code
        } = req.body;
        const credentialCheck = await UserEntry.findOne({
            "email.primaryEmail": email.toLowercase()
        }).excec(function(err, docs) {
            if (err) {
                next(err);
                res.status(422);
            }
            if (docs == null) {
                var err = 'User not found';
                res.status(400);
                next(err);
            }
        });
        var transporter = nodeMailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.GMAIL_USERNAME == null ? 'somerandome@gmail.com' : process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD == null ? '123456' : process.env.GMAIL_PASSWORD
            }
        });
        var mailOPtions = {
            from: process.env.GMAIL_USERNAME == null ? 'somerandome@gmail.com' : process.env.GMAIL_USERNAME,
            to: email,
            subject: 'Forgot Password Confirmation',
            text: 'Hello ' + credentialCheck[0].fullName + ' please input the following code ' + code + ' on the forgot password page. \nIf you did not request this change you can ignore this email.'
        }
        try {
            transporter.sendMail(mailOPtions, function(err, info) {
                if (err) {
                    next(err);
                    res.status(500);
                }
            });
        } catch (err) {
            next(err);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;