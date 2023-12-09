const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
        type: String,
        enum: ["ARTIST", "ADMIN", "USER"],
        default: "USER"
    },
    timezone: {
        type: String,
        enum: ['EST', 'CST', 'MST', 'PST', 'GMT'],
    },
    artistID: {
        type: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
    { collection: "users" });
module.exports = userSchema;