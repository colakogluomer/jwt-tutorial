import UserService from "../services/UserService.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await UserService.login({ email, password });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, date } = req.body;
    const newUser = await UserService.register({ name, email, password, date });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
};
