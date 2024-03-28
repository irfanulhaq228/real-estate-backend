const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;