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
    const session = req?.session;
    const email = req.body.email;
    const password = req.body.password;
    const result = await userService.authenticateUser(email, password, session);

    return res.status(200).json({
      success: true,
      data: result,
      message: "sucessfully logged in",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "sorry we can't able to authenticate ur credentials",
      error: error.message,
      data: [],
    });
  }
}

async function updateUserDetails(req, res) {
  try {
    const session = req?.session;
    const updateData = req.body;

    const updatedUser = await userService.updateUserProfile(session, updateData);
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
