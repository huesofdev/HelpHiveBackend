const bcrypt = require("bcryptjs");
const { generateUserToken } = require("../utils/jwt.utils");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserProfile(id) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }

  async registerUser(userData) {
    if (!userData.email || !userData.name || !userData.password) {
      throw new Error("required fields cannot be empty");
    }
    if (!userData.role) {
      throw new Error("Role is required");
    }
    if (userData.role !== "ngo" && userData.role !== "donor") {
      throw new Error("Role must be ngo or donor");
    }

    const user = await this.userRepository.findUserByEmail(userData.email);
    if (user) {
      throw new Error("This Email is Already Registered");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    const newUserData = userData;
    newUserData.passwordHash = passwordHash;
    delete newUserData.password;

    const newUser = await this.userRepository.createUser(newUserData);
    return generateUserToken(newUser);
  }

  async authenticateUser(email, password) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return generateUserToken(user);
  }

  updateUserProfile = async (session, updateData) => {
    if(!session){
      throw new Error("please login to update your profile")
    }
    const userId = session.id;
    return await this.userRepository.updateUser(userId, updateData);
  };
}

module.exports = UserService;
