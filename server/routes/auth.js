import express from "express";
import UserService from "../services/UserService.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, date } = req.body;
    const newUser = await UserService.register({ name, email, password, date });
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await UserService.login({ email, password });
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default router;
