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
            _id,
            wardrobe_id,
        } = req.body;
        const wardrobeEntry = await UserEntry.find({
            '_id': _id,
            'wardrobe._id': wardrobe_id,
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('User Wardobe: ' + docs);
                res.status(200).json(wardrobeEntry);
            }
        })
    } catch (error) {
        res.status(422);
        next(error);
    }
});

router.get('/getSpecificArticle', async(req, res, next) => {
    try {
        const {
            _id,
            wardrobe_id,
            RFID,
        } = req.body;
        const articleEntry = await UserEntry.find({
            '_id': _id,
            'wardrobe._id': wardrobe_id,
            'wardrobe.article.RFID': RFID
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('User Wardobe: ' + articleEntry);
                res.status(200).json(articleEntry);
            }
        })
    } catch (error) {
        res.status(422);
        next(error);
    }
});

router.get('/getNumberOfArticlesInWardrobe', async(req, res, next) => {
    try {
        const {
            _id,
            wardrobe_id,
        } = req.body;
        const articleEntry = await UserEntry.find({
            '_id': _id,
            'wardrobe._id': wardrobe_id,
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Number of articles in wardrobe: ' + articleEntry[0].wardrobe[0].totalNumberOfArticles);
                var ret = {
                    totalNumberOfShirts: articleEntry[0].wardrobe[0].totalNumberOfShirts,
                    totalNumberOfPants: articleEntry[0].wardrobe[0].totalNumberOfPants  
                }
                res.status(200).json(ret);
            }
        })
    } catch (error) {
        res.status(422);
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
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;