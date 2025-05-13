const { AdminRepository } = require("../repositories");
const { AdminService } = require("../services");

const adminService = new AdminService(new AdminRepository());

async function createAdminUser(req, res) {
  try {
    const adminData = req.body;
    const jwt = await adminService.createAdminUser(adminData);
    return res.status(200).json({
      success: true,
      message: `Admin User Created Successfully`,
      data: jwt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Sorry We can't Create the Admin User Right now",
      data: [],
      error: error.message,
    });
  }
}

async function adminAuthentication(req, res) {
  try {
    if (req.session) {
      return res.status(200).json({
        success: true,
        message: `Already Logged in As ${req.session.name}`,
        data: req.session,
      });
    }
    const { email, password } = req.body;
    const jwt = await adminService.authenticateAdmin(email, password);
    return res.status(200).json({
      success: true,
      message: "Successfully Logged In",
      data: jwt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Sorry We Can't Verify your Credentials Right now",
      data: [],
      error: error.message,
    });
  }
}

async function ngoRequestApproval(req, res) {
  try {
    console.log(req.session);
    if (req.session.role !== "admin") {
      throw new Error(
        "you must be an admin user inorder to request or approve"
      );
    }
    const ngoId = req.params.id;
    const status = req.body.status;

    const user = await adminService.getNgoProfile(ngoId);
    if (
      user.ngoApprovalStatus === "approved" ||
      user.ngoApprovalStatus === "rejected"
    ) {
      throw new Error(
        `cannot be ${status} cuz already ${user.ngoApprovalStatus}`
      );
    }
    if (status !== "approved" && status !== "rejected") {
      throw new Error("please use a valid status");
    }
    const result = await adminService.approveNgo(ngoId, status);
    return res.status(200).json({
      success: true,
      message: `${result.ngoApprovalStatus} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function banUser(req, res) {
  try {
    const id = req.params.id;
    const user = adminService.getUserProfile(id);
    if (!user) {
      throw new Error("there is no such users");
    }
    if (user.status === "banned") {
      throw new Error("user is already banned");
    }
    await userService.banUser(id);
    return res.status(200).json({
      success: true,
      message: `successfully banned the user ${user.name}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function viewPendingNgos(req, res) {
  try {
    const pendingNgos = await adminService.listPendingNgos();
    return res.status(200).json({
      success: true,
      data: pendingNgos,
      message: "successfully fetched all the pending ngos",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getAdminProfile(req, res) {
  try {
    const id = req.session.id;
    console.log(id);
    const user = await adminService.getAdminProfile(id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}

module.exports = {
  banUser,
  ngoRequestApproval,
  viewPendingNgos,
  getAdminProfile,
  createAdminUser,
  adminAuthentication,
};
