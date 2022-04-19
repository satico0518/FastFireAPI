const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const [total, users] = await Promise.all([
    User.countDocuments({ isActive: true }).where('isActive'),
    User.find({ isActive: true }).limit(Number(limit)).skip(Number(skip)),
  ]);
  res.json({ total, users });
};

const userByIdGet = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ msg: `usuario con id ${id}` });
};

const userPost = async (req = request, res = response) => {
  try {
    const { identification, password, name } = req.body;
    const user = new User({ identification, password, name });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

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
  res.json({ msg: 'user updated', id });
};

const updateUserDelete = async (req = request, res = response) => {
    const { id } = req.params;
  
    await User.findByIdAndUpdate(id, {isActive: false});
    res.json({ msg: 'user inactivated', id });
  };

module.exports = {
  userGet,
  userByIdGet,
  userPost,
  updateUserPut,
  updateUserDelete,
};
