const bcrypt = require("bcryptjs");
const { generateUserToken } = require("../utils/jwt.utils");

class AdminService {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async createAdminUser(data) {
    const { name, email, password } = data;

    // Check required fields first
    if (!name || !email || !password) {
      throw new Error("Required fields cannot be empty.");
    }

    // Then check for existing user
    const user = await this.adminRepository.findAdminByEmail(email);
    if (user) {
      throw new Error("Email is already registered.");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const adminData = {
      name,
      email,
      passwordHash,
    };
    const Newuser = await this.adminRepository.createAdminUser(adminData);
    return generateUserToken(Newuser);
  }

  async authenticateAdmin(email, password) {
    if (!email || !password) {
      throw new Error("Please enter a valid email and password.");
    }

    const user = await this.adminRepository.findAdminByEmail(email);
    if (!user) {
      throw new Error("There is no such user.");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Email or password is incorrect.");
    }
    const jwt = await generateUserToken(user);
    return jwt;
  }

  async getAdminProfile(id) {
    return this.adminRepository.findAdminById(id);
  }

  async getNgoProfile(id) {
    return this.adminRepository.findUserById(id);
  }

  async approveNgo(ngoId, status) {
    return this.adminRepository.approveNgo(ngoId, status);
  }

  async banUser(userId) {
    return this.adminRepository.banUser(userId);
  }

  async listPendingNgos() {
    return this.adminRepository.findPendingNgos();
  }

  async listUsersByRole(role) {
    return this.adminRepository.findUsersByRole(role);
  }
}

module.exports = AdminService;
