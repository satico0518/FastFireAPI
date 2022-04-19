const { response } = require('express');
const { request } = require('express');

const verifyRoles = (...roles) => {
  return (req = request, res = response, next) => {
    try {
      if (!req.user) {
        return res.status(500).json({ error: { msg: `Usuario no validado` } });
      }
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({
            error: {
              msg: `Usuario con perfil [${req.user.role}], no valido para esta operacion!`,
            },
          });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };
};

module.exports = { verifyRoles };
