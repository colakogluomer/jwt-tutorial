import express from "express";
import UserService from "../services/UserService.js";

const router = express.Router();

//Register Controller
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, date } = req.body;
    const newUser = await UserService.register({ name, email, password, date });
    res.json(newUser);
  } catch (error) {
    next({
      statusCode: 400,
      errorMessage: error.message,
    });
  }
});

//Login Controller
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await UserService.login({ email, password });
    res.json(newUser);
  } catch (error) {
    next({
      statusCode: 400,
      errorMessage: error.message,
    });
  }
});

export default router;
