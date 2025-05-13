const mongoose = require('mongoose');

const WalletSchema = mongoose.Schema(
    {
        user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
        balance: {type: Number, default: 0}, 
    }, {timestamps: true}
)


const Wallet = mongoose.model('Wallet', WalletSchema);
module.exports = Wallet;