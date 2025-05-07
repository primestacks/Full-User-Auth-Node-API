const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check the database if username or password already exist
    let existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email or username already exist. Login or try a different email",
      });
    }

    // proceed to creating new user if no user with email or password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // save new user object to database
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    if (err) {
      res.status(501).json({
        Message: `Error: Something went wrong! ${err.Message}`,
      });
    }
  }
};

// Uers Login route handler
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }
    // conpared hashed password and user input
    const isMatch = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res.status(500).json({
      message: "Sever eror | somthing went wrong}",
    });
  }

  await res.status(200).json({
    message: "Posting to signup page from authControler",
  });
};

module.exports = {
  signup,
  login,
};
