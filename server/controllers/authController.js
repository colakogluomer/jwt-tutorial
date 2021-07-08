const UserService = require("../services/UserService");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });
    res.send(token);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, date } = req.body;
    const newUser = await UserService.register({ name, email, password, date });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
};
module.exports.login = login;
module.exports.register = register;
