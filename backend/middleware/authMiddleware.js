const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("_id");

    if (!user) throw Error("User not Found!");

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not Authorized" });
  }
};

module.exports = requireAuth;
