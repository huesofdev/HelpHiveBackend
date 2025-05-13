const { Admin } = require("../models");
const { User } = require("../models");

class AdminRepository {
  async createAdminUser(userData) {
    const newUser = new Admin(userData);
    return await newUser.save();
  }

  async findAdminByEmail(email) {
    return await Admin.findOne({ email });
  }

  async findAdminById(id) {
    return await Admin.findById(id);
  }

  //tasks allocated to admins on user models

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async findPendingNgos() {
    return await User.find({ role: "ngo" }, { ngoApprovalStatus: "pending" });
  }

  async approveNgo(id, status) {
    return await User.findByIdAndUpdate(
      id,
      { ngoApprovalStatus: status },
      { new: true }
    );
  }

  async banUser(id) {
    return await User.findByIdAndUpdate(
      id,
      { status: "banned" },
      { new: true }
    );
  }

  async findUsersByRole(role) {
    return await User.find({ role });
  }

  async deleteUserById(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = AdminRepository;
