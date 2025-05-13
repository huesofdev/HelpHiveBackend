const { UserRepository } = require("../repositories");
const { UserService } = require("../services");

const userService = new UserService(new UserRepository());

async function createNewUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await userService.registerUser(userData);
    return res.status(200).json({
      success: true,
      message: "successfully created the user",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create the user",
      error: error.message,
    });
  }
}

async function getUserProfile(req, res) {
  try {
    const id = req.params.id;
    const user = await userService.getUserProfile(id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function LoginAuthentication(req, res) {
  try {
    if (req.session) {
      return res.status(400).json({
        success: false,
        message: `Already Logged in as ${req.session.name}`,
        data: [],
      });
    }
    const email = req.body.email;
    const password = req.body.password;
    const result = await userService.authenticateUser(email, password);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateUserDetails(req, res) {
  try {
    const user = await userService.getUserProfile(id);
    id = req.params.id;
    updateData = req.body;
    if (!user) {
      throw new Error("there is no such user");
    }

    const updatedUser = await userService.updateUserProfile(id, updateData);
    return res.status(200).json({
      success: true,
      message: `sucessfully updated the user Profile`,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createNewUser,
  getUserProfile,
  LoginAuthentication,
  updateUserDetails,
};
