const { Router } = require('express');

const UserEntry = require("../models/user");

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        const entries = await UserEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.get('/getSpecificWardrobe', async(req, res, next) => {
    try {
        const {
            id_,
            wardrobe_id,
        } = req.body;
        console.log('testy');
        const articleEntry = await UserEntry.find({
            '_id': id_,
            'wardrobeData._id': wardrobe_id,
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('User Wardobe: ' + docs.wardrobeData);
            }
        })
    } catch (error) {
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try {
        console.log(req.body);
        const userEntry = new UserEntry(req.body);
        const createdEntry = await userEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if (error.name === 'Validation Error') {
        }
        next(error);
    }
});

module.exports = router;