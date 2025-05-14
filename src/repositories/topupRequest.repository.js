const {TopupRequest} = require('../models');

class TopupRequestRepository {
    
    async createTopupRequest(requestData) {
        return await TopupRequest.create(requestData);
    }

    
    async updateStatus(id, updateData) {
        return await TopupRequest.findByIdAndUpdate(id, updateData, { new: true });
    }

    
    async findByUser(userId) {
        return await TopupRequest.find({ user: userId }).sort({ createdAt: -1 });
    }

   
    async findPendingRequests() {
        return await TopupRequest.find({ status: 'pending' }).populate('user');
    }

    async deleteById(id) {
        return await TopupRequest.findByIdAndDelete(id);
    }
}

module.exports = TopupRequestRepository;
