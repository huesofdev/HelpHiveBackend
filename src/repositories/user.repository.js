const { User } = require("../models");

class UserRepository{

     async findUserByEmail(email) {
        return await User.findOne({email});
    }

    async findUserById(id){
        return await User.findById(id);
    }

    async createUser(userData){
        const newUser =  new User(userData);
        return await newUser.save();
    }

    async updateUser(id, updateData){
        return await User.findByIdAndUpdate(id, updateData, {new: true});
    }



   
}

module.exports = UserRepository;