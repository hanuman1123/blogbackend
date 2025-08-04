import bcrypt from "bcryptjs";
import User from "../models/user.model.js"; // adjust path based on your structure

export const register = async (req, res) => {
  const { username, FirstName, LastName, email, password } = req.body;

  // Validation
  if (!username) return res.status(400).json({ success: false, message: "Username required" });
  if (!FirstName) return res.status(400).json({ success: false, message: "First name required" });
  if (!LastName) return res.status(400).json({ success: false, message: "Last name required" });
  if (!email) return res.status(400).json({ success: false, message: "Email required" });
  if (!password) return res.status(400).json({ success: false, message: "Password required" });

  try {
    // Check if user exists
    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      FirstName,
      LastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "New user created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create the user",
      error: error.message,
    });
  }
};
