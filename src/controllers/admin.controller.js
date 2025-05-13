const { AdminRepository } = require("../repositories");
const { AdminService } = require("../services");

const adminService = new AdminService(new AdminRepository());

async function createAdminUser(req, res) {
  try {
    const adminData = req.body;
    const session = req?.session;
    const jwt = await adminService.createAdminUser(adminData, session);
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
    const session = req?.session;
    const { email, password } = req.body;
    const jwt = await adminService.authenticateAdmin(email, password, session);
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
    const ngoId = req.params?.id;
    const status = req.body?.status;

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
    const result = await adminService.approveNgo(ngoId, status, session);
    return res.status(200).json({
      success: true,
      message: `We ${result.ngoApprovalStatus} the Ngo successfully`,
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Sorry We can't Able to Approve Or Reject the Ngo Right Now",
      error: error.message,
      data: [],
    });
  }
}

async function banUser(req, res) {
  try {
    const session = req?.session;
    const id = req.params.id;
    const user = adminService.getUserProfile(id, session);
    if (!user) {
      throw new Error("No User Found");
    }
    if (user.status === "banned") {
      throw new Error("User Is Already Banned");
    }
    await userService.banUser(id, session);
    return res.status(200).json({
      success: true,
      message: `Successfully Banned The User ${user.name}`,
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "We Can't Ban the User Right Now",
      data: [],
      error: error.message,
    });
  }
}

async function viewPendingNgos(req, res) {
  try {
    const session = req?.session;
    const pendingNgos = await adminService.listPendingNgos(session);
    return res.status(200).json({
      success: true,
      data: pendingNgos,
      message: "Successfully Fetched All The Pending Ngos",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "We Can't Fetch All The Pending Ngos Right Now",
      error: error.message,
      data: [],
    });
  }
}

async function getAdminProfile(req, res) {
  try {
    console.log(id);
    const user = await adminService.getAdminProfile(id);
    return res.status(200).json({
      success: true,
      data: user,
      message: "Successfully Fetched the Admin Profile",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Sorry We Can't Fetch The Admin Profile Right Now",
      error: error.message,
      data: []
    });
  }
}

async function deleteUser(req, res) {
  try {
    const session = req?.session;
    id = req.params?.id
    const user = await adminService.deleteUser(id, session)
    return res.status(200).json({
      success: true,
      message: `Successfully Deleted The User ${user?.name}`,
      data: []
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      mesage: "Can't Delete the User Right Now",
      error: error.mesage,
      data: []
    })
  }
}

module.exports = {
  banUser,
  ngoRequestApproval,
  viewPendingNgos,
  getAdminProfile,
  createAdminUser,
  adminAuthentication,
  deleteUser
};
