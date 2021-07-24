 
const { Router } = require('express');
const { listeners } = require('../models/user');
const multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null,'./client/public/images/uploads')
        },
        filename: function (req, file,cb){
            cb(null, req.body._id + req.body.wardrobe_id + file.originalname)
        }
    }
)

const fileFilter = (req,file,cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null,true);
    }else
    {
        cb(null,false);
    }

};

const upload = multer({storage: storage, limits:{fileSize: 1024 * 1024 * 5}, fileFilter: fileFilter});

const UserEntry = require('../models/user');

const router = Router();

const util = require('./util');

router.post('/addWardrobe',async(req, res, next) => {
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
            ).sort({ 'totalNumberOfArticles': "desc" }).exec(function(err, docs) {
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
            wardrobe_id,
        } = req.body;

        let doc = await UserEntry.findOneAndUpdate({
            'wardrobe._id': wardrobe_id,
        }, {
            $pull: {
                wardrobe:{
                    '_id': wardrobe_id
                }
        }}).sort({ 'totalNumberOfArticles': "desc" }).exec(function(err, docs) {
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
            wardrobe_id,
            location,
        } = req.body;
        await UserEntry.findOneAndUpdate({
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
router.post('/addArticle', upload.single('picture'),async(req, res, next) => {
    try {
        /* '_id' : ''*/
        console.log(req.file);
        const {
            _id,
            wardrobe_id,
            RFID,
            color,
            type,
            desc,
        } = req.body;
        //splice herre
        let picture = req.file.path;
        let path = picture.split("public/");
        console.log(path[1]);
  
        let article = await UserEntry.findOne({
            "wardrobe._id":wardrobe_id
        }).select({wardrobe:{$elemMatch:{_id:wardrobe_id}}})
        
        if (!article) {
            throw new Error('Article not found');
        }
        // yup and all to be able to extract the data, I played with it for a while and this is what worked
        article = article.toObject().wardrobe;
        var update = util.updateNumberOfArticles(article[0].totalNumberOfShirts,article[0].totalNumberOfPants, type, 1);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobe._id': wardrobe_id
        },{
            $set: {
                    'wardrobe.$.totalNumberOfShirts' : update[0],
                    'wardrobe.$.totalNumberOfPants' :  update[1],
                    'wardrobe.$.totalNumberOfArticles' : update[0] + update [1],
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log("Updated Amounts");
            }
        });
        // up to here is working here
        console.log(_id);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobe._id': wardrobe_id
        }, {
            $addToSet:
            {
               'wardrobe.$.articleData':
               {
                    RFID:RFID,
                    type: type,
                    color: color,
                    desc: desc,
                    picture: path[1]
               }
            }
        },{new: true,upsert:true}).sort({ 'timesUsed': "desc" }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Added Article Wardobe: ' + docs);
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
            type
        } = req.body;
        let article = await UserEntry.findOne({
            "wardrobe._id":wardrobe_id
        }).select({wardrobe:{$elemMatch:{_id:wardrobe_id}}})
        
        if (!article) {
            throw new Error('Article not found');
        }
        // yup and all to be able to extract the data, I played with it for a while and this is what worked
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobe._id': wardrobe_id
        }, {
            $pull:
            {
               'wardrobe.$.articleData':
               {
                    RFID:RFID,
               }
            }
        }).select({wardrobe:{$elemMatch:{_id:wardrobe_id}}}).sort({ 'timesUsed': "desc" }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Removed Article: ' + docs);
                res.status(200).json(docs);
            }
        })
        article = article.toObject().wardrobe;
        var update = util.updateNumberOfArticles(article[0].totalNumberOfShirts,article[0].totalNumberOfPants, type, 0);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobe._id': wardrobe_id
        },{
            $set: {
                    'wardrobe.$.totalNumberOfShirts' : update[0],
                    'wardrobe.$.totalNumberOfPants' :  update[1],
                    'wardrobe.$.totalNumberOfArticles' : update[0] + update [1],
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log("Updated Amounts");
            }
        });
        // up to here is working here
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
// router.post('/updateArticle', async(req, res, next) => {
//     try {
//         const {
//             _id,
//             wardrobe_id,
//             RFID,
//             color,
//             type
//         } = req.body;
//         await UserEntry.findOneAndUpdate({
//             '_id': _id,
//             'wardrobeData._id': wardrobe_id,
//             'RFID': RFID
//         }, {
//             $set: {
//                     'wardrobe.$.articleData':
//                     {
//                         color : color,
//                         type :  type,
//                         timesUsed : 0,
//                     }
//             }
//         }).exec(function(err, docs) {
//             if (err) {
//                 next(err);
//             } else {
//                 console.log('Updated Article Wardobe: ' + docs);
//                 res.status(200).json(docs);
//             }
//         });
//     } catch (error) {
//         if (error.name === 'Validation Error') {
//             res.status(422);
//         }
//         next(error);
//     }
// });
router.post('/updateTimesUsed', async(req, res, next) => {
    try {
        const {
            _id,
            wardrobe_id,
            RFID,
        } = req.body;
        let currentTimesUsed = 0;
        let article = await UserEntry.findOne({
            "wardrobe._id":wardrobe_id
        }).select({wardrobe:{$elemMatch:{_id:wardrobe_id}}})
        
        if (!article) {
            throw new Error('Article not found');
        }
        // yup and all to be able to extract the data, I played with it for a while and this is what worked
        article = article.toObject().wardrobe;
        let currentStatus = article[0].articleData[0].status;    
        console.log(currentStatus + ' ' + currentTimesUsed);
        if (currentStatus == 'A')
        {
            currentStatus = 'NA';
            currentTimesUsed = article[0].articleData[0].timesUsed + 1;
        } 
        else
        {
            currentStatus = 'A';
            currentTimesUsed = article[0].articleData[0].timesUsed;
        }
        console.log(currentStatus + ' ' + currentTimesUsed);
        console.log(_id + ' ' + wardrobe_id + ' ' + RFID);
        let test = await UserEntry.findOneAndUpdate({
                '_id': _id,
                'wardrobe._id': wardrobe_id,
                'wardrobe.articleData.RFID': RFID
            }, {
                $set: {
                    'wardrobe.$.articleData':
                    {
                        'RFID' : article[0].articleData[0].RFID,
                        'color': article[0].articleData[0].color,
                        'type' : article[0].articleData[0].type,
                        'desc' : article[0].articleData[0].desc,
                        'timesUsed': currentTimesUsed,
                        'status':currentStatus
                    }
                    
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
            console.log('article : ' + test);
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;