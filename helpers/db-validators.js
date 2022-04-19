const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async (role = 'USER_ROLE') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no esta definido!`);
  }
};

const userExists = async (identification) => {
    const userExists = await User.findOne({ identification });
    if (userExists) {
      throw new Error(`El usuario ${identification} ya esta registrado!`)
    }
}

const userExistsById = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new Error(`El id [${id}] no se encuentra en la BD!`);
    }
}

module.exports = {
    roleValidation,
    userExists,
    userExistsById,
};
