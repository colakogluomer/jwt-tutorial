import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, date } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      date,
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

export default router;
