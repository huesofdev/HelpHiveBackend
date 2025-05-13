const mongoose = require('mongoose');

const DonationSchema = mongoose.Schema({
    donor: {type: mongoose.Schema.ObjectId, ref:'User', required: true},
    campaign: {type: mongoose.Schema.ObjectId, ref: 'Campaign', required: true},
    amount: {type: Number, required: true} 
}, {timestamps: true});

const Donation = mongoose.model('Donation', DonationSchema);
module.exports = Donation; 