const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;
    const user = await userModel.findById(userId); // Corrected line

    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      
      const tokenData = {
        id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
      };

      return res.cookie("token", token, cookieOptions).status(200).json({
        message: "Login Successful",
        token: token,
        success: true,
      });
    } else {
      return res.status(401).json({ message: "Incorrect Password!!", error: true });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
