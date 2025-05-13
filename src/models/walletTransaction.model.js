const mongoose = require('mongoose');


const WalletTransactionSchema = mongoose.Schema({
    amount: {type: Number, required: true},
    type: {type: String, enum: ['topup', 'donation'], required: true},
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true},
    campaign: {type: mongoose.Schema.ObjectId, ref: 'Campaign', validate: function validator(v){
        return this.type === 'donation' ?  !!v : true
    }, message: "Campaign is required for donations"}, 
    status: {type: String, enum: ['success', 'failed'], default: 'success'}
}, {timestamps: true})

const WalletTransaction = mongoose.model('WalletTransaction', WalletTransactionSchema);
module.exports = WalletTransaction;