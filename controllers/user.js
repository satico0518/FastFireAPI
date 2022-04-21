const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  const [total, users] = await Promise.all([
    User.countDocuments(),
    User.find(),
    // User.find().limit(Number(limit)).skip(Number(skip)),
  ]);
  res.json({ total, users });
};

const userInactiveGet = async (req, res = response) => {
  const users = await User.find({ isActive: false })
  res.json(users);
};

const userByIdGet = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

const userPost = async (req = request, res = response) => {
  try {
    const user = new User(req.body);
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(req.body.password, salt);

    await user.save();

    res.status(201).json({ msg: 'user created', user });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const updateUserPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { identification, password, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  await User.findByIdAndUpdate(id, rest);
  res.json({ msg: 'user updated', id, authed_user: req.user });
};

const updateUserDelete = async (req = request, res = response) => {
    const { id } = req.params;
  
    await User.findByIdAndUpdate(id, {isActive: false});
    res.json({ msg: 'user inactivated', id, authed_user: req.user });
  };

module.exports = {
  userGet,
  userInactiveGet,
  userByIdGet,
  userPost,
  updateUserPut,
  updateUserDelete,
};
