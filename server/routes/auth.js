import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, date } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      date,
    });

    res.json(user);
  } catch (error) {
    // You can be change json's properties such as error.message
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    res.send("logged in");
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
