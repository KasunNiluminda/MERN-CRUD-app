const User = require("../models/userModel");

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  const { firstName, lastName, dob, address, gender } = req.body;
  const user = new User({
    firstName,
    lastName,
    dob,
    address,
    gender,
  });

  const createdUser = await user.save();
  res.status(201).json(createdUser);
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  const { firstName, lastName, dob, address, gender } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.dob = dob;
    user.address = address;
    user.gender = gender;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
