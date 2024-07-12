const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

async function getUserDetailsFromToken(token) {
  if (!token) {
    return {
      message: "Session OUT",
      logout: true,
    };
  }
  const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

  const user = await userModel.findById(decode.id).select("-password");

  return user;
}


module.exports = getUserDetailsFromToken;
