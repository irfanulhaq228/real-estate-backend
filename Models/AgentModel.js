const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    address: String,
    password: String,
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});

const agentModel = mongoose.model('agent', agentSchema);

module.exports = agentModel;