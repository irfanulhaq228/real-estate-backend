const mongoose = require("mongoose");

const homeForSaleSchema = mongoose.Schema({
    address: String,
    property: String,
    advancePayment: String,
    bathrooms: String,
    bedrooms: String,
    salePrice: String,
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

const homeForSaleModel = mongoose.model('sellhome', homeForSaleSchema);

module.exports = homeForSaleModel;