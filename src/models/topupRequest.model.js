const mongoose = require('mongoose');

const TopupRequestSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true},
    proofImage: {type: String, required: true},
    status: {type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending'},
    admin: {type: mongoose.Schema.ObjectId, ref: 'Admin', validator: function(v){
        return this.status === 'pending' || !!v; 
    }, message: 'Admins msut be assigned for approved or rejected statuses'},
    rejectionReason: {type: String}
}, {timestamps: true})

const TopupRequest = mongoose.model('TopupRequest', TopupRequestSchema);

module.exports = TopupRequest;