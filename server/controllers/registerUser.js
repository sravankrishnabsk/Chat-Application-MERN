const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "User Already Exists",
        error: true,
      });
    }
    // Hashing Password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashedPassword,
    };

    const user = new userModel(payload);
    const userSave = await user.save();

    return res.status(201).json({
        message: 'User Created Successfully',
        data: userSave,
        success: true
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
}

module.exports = registerUser;