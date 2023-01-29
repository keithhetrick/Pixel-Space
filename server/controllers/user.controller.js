import User from "../models/user.model.js";

// Create a new user
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

// Get all users
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

// Get a user by id
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

// Update a user's name, email, password, and relational posts
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, posts } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        confirmPassword,
        posts,
      },
      { new: true }
    );

    if (password !== confirmPassword) {
      res.status(500).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (posts) {
      user.posts.push(req.body.posts);
    } else if (posts === []) {
      user.posts = [];
    } else {
      res.status(500).json({
        success: false,
        message: "Posts already exists",
      });
    }

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.confirmPassword = req.body.confirmPassword || user.confirmPassword;
      user.posts = req.body.posts || user.posts;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        confirmPassword: updatedUser.confirmPassword,
        posts: updatedUser.posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Updating user failed - ${err.message}`,
    });
  }
};

// Delete a user
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

// Get a user's relational posts
export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    res.status(200).json({ success: true, data: user.posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching user posts failed - ${err.message}`,
    });
  }
};
