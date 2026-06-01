const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function auth(req, res, next) {
  try {
    const bearer = req.headers.authorization || "";
    const tokenFromHeader = bearer.startsWith("Bearer ")
      ? bearer.split(" ")[1]
      : null;
    const token = req.cookies.token || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

async function optionalAuth(req, res, next) {
  try {
    const bearer = req.headers.authorization || "";
    const tokenFromHeader = bearer.startsWith("Bearer ")
      ? bearer.split(" ")[1]
      : null;
    const token = req.cookies.token || tokenFromHeader;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }
    next();
  } catch (err) {
    // If token is invalid, just proceed as guest
    next();
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}

module.exports = { auth, optionalAuth, allowRoles };
