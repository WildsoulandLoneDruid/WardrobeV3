//import wardrobeSchema from './wardrobe';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true,
}
const emailData = {
    primaryEmail: { type: String, default: null },
}
const securityData = {
    password: { type: String },
}
const articleData = {
    RFID: { type: String, default: null },
    picture: {type: String, default: null},
    timesUsed: { type: Number, default: 0 },
    color: { type: String, default: null },
    type: { type: String, enum: ['shirt', 'pants'], default: null},
    status: { type: String,enum: ['A', 'NA'] ,default: 'A'},
    desc: { type: String, default: null },
}
const wardrobeData = {
    location: { type: String, requried:true },
    totalNumberOfArticles: { type: Number, default: 0 },
    totalNumberOfShirts: { type: Number, default: 0 },
    totalNumberOfPants: { type: Number, default: 0 },
    articleData: [articleData],
}
const usersSchema = new Schema({
    fullName: requiredString, // String is shorthand for {type: String}
    email: [emailData],
    security: [securityData],
    wardrobe: [wardrobeData],
});

module.exports = mongoose.model('users', usersSchema);