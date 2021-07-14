const { Router } = require('express');

const UserEntry = require('../models/user');

const router = Router();

const util = require('./util');

router.post('/addWardrobe', async(req, res, next) => {
    try {
        const {
            _id,
            location,
        } = req.body;

        let doc = await UserEntry.findOneAndUpdate({
                '_id': _id,
            }, {
                $addToSet: {
                    wardrobe:{
                        "location":location
                    }
            }},{new: true,upsert:true}
            ).sort({ 'location': "desc" }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Added Wardobe: ' + docs.wardrobe);
                res.status(200).json(docs.wardrobe);
            }
        });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/deleteWardrobe', async(req, res, next) => {
    try {
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
        } = req.body;

        let doc = await UserEntry.findOneAndUpdate({
            '_id': _id,
        }, {
            $pull: {
                wardrobe:{
                    '_id': wardrobe_id
                }
        }}).sort({ 'location': "desc" }).exec(function(err, docs) {
        if (err) {
            next(err);
        } else {
            console.log('Added Wardobe: ' + docs.wardrobe);
            res.status(200).json(docs.wardrobe);
        }
    });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/updateWardrobe', async(req, res, next) => {
    try {
        const {
            _id,
            wardrobe_id,
            location,
        } = req.body;
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobe._id': wardrobe_id
        }, {
            $set: {
                'wardrobe.$.location' : location
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Wardobe: ' + docs);
                res.status(200).json(docs);
            }
        });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/addArticle', async(req, res, next) => {
    try {
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            RFID,
            color,
            type
        } = req.body;
        var update = util.updateNumberOfArticles(articleCheck, type, 1);
        const articleEntry = await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobe._id': wardrobe_id
        }, {
            $set: {
                wardrobe:{
                    'wardrobe.$.totalNumberOfShirts' : update.updateNumberOfShirts,
                    'wardrobe.$.totalNumberOfPants' :  update.totalNumberofPants,
                    'wardrobe.$.totalNumberOfArticles' : update.totalNumberofPants + update.totalNumberofShirts
                }
            },
            $addToSet:
            {
                wardrobe:
                {
                    articleData: {
                        'RFID': RFID,
                        'color': color,
                        'type': type,
                        'active': 'inactive',
                    }
                }
            }
        }, {new: true,upsert:true}).sort({ 'timesUsed': "desc" }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Added Article Wardobe: ' + articleEntry);
                res.status(200).json(docs);
            }
        })
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/removeArticle', async(req, res, next) => {
    try {
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            RFID,
        } = req.body;
        var update = util.updateNumberOfArticles(articleCheck, type, 0);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobeData._id': wardrobe_id,
        }, {
            $set: {
                wardrobe:{
                    'wardrobe.$.totalNumberOfShirts' : update.updateNumberOfShirts,
                    'wardrobe.$.totalNumberOfPants' :  update.totalNumberofPants,
                    'wardrobe.$.totalNumberOfArticles' : update.totalNumberofPants + update.totalNumberofShirts
                }
            },
            $pull: {
                wardrobe:{
                   article:
                   {
                    'RFID': RFID
                   }
                }
        }}).sort({ 'timesUsed': "desc" }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Article Wardobe: ' + docs);
                res.status(200).json(docs);
            }
        })
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/updateArticle', async(req, res, next) => {
    try {
        const {
            _id,
            wardrobe_id,
            RFID,
            color,
            type
        } = req.body;
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobeData._id': wardrobe_id,
            'RFID': RFID
        }, {
            $set: {
                    'wardrobe.$.article.$.color' : color,
                    'wardrobe.$.article.$.type' :  type,
                    'wardrobe.$.article.$.timesUsed' : 0,
                    'wardrobe.$.article.$.active' : 'inactive'
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Article Wardobe: ' + docs);
                res.status(200).json(docs);
            }
        });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/updateTimesUsed', async(req, res, next) => {
    try {
        const {
            _id,
            wardrobe_id,
            RFID,
        } = req.body;
        const articleEntry = await UserEntry.findOneAndUpdate({
                '_id': _id,
                'wardrobeData._id': wardrobe_id,
                'RFID': RFID
            }, {
                $set: {
                    'wardrobe.$.articleData.$.timesUsed': articleEntry[0].wardrobe[0].articleData[0].timesUsed++,
                    'wardrobeData.$.articleData.$.status': !(articleEntry[0].wardrobe[0].articleData[0].status),
                }
            }).sort({ 'timesUsed': "desc" })
            .exec(function(err, docs) {
                if (err) {
                    next(err);
                } else {
                    console.log('Updated Article Wardobe: ' + docs);
                    res.status(200).json(docs);
                }
            });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
module.exports = router;