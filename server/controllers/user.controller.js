import User from "../models/user.model.js";

// CONTROLLERS
export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Unable to create a user - ${err.message}`,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("posts");

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching users failed - ${err.message}`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching user failed - ${err.message}`,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        confirmPassword,
        // $push: { posts: req.body.postId },
      },
      { new: true }
    );

    if (password !== confirmPassword) {
      res.status(500).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // if (name) user.name = name;
    // if (email) user.email = email;
    // if (password) user.password = password;
    // if (confirmPassword) user.confirmPassword = confirmPassword;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Updating user failed - ${err.message}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Deleting user failed - ${err.message}`,
    });
  }
};
