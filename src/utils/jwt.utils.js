const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/server.config");

//user session token generation

const generateUserToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    status: user.status,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2 days" });
};

const verifyJwt = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Please Sign in to Access This",
      data: [],
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
        data: [],
      });
    }

    req.session = decoded;
    next();
  });
};

module.exports = {
  generateUserToken,
  verifyJwt,
};
