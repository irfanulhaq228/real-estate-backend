const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost:27017/RealEstate").then(() => {
    console.log("Mongodb Connected!")
});

module.exports = db;