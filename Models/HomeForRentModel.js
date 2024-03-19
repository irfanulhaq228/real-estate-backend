const mongoose = require("mongoose");

const homeForRentSchema = mongoose.Schema({
    address: String,
    property: String,
    advancePayment: String,
    bathrooms: String,
    bedrooms: String,
    monthlyPrice: String,
    overview: String,
    services: String,
    title: String,
    keyFeatures: String,
    buildingSize: String,
    lotSqft: String,
    petFees: String,
    sizeSqft: String,
    sizeAcre: String,
    images: [],
    video: String,
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'agent' },
    status: { type: Boolean, default: false }
}, {
    timestamps: true
});

const homeForRentModel = mongoose.model('rentalHome', homeForRentSchema);

module.exports = homeForRentModel;