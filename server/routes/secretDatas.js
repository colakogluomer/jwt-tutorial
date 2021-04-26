import express from "express";
const router = express.Router();
import tokenVerify from "../middlewares/verifyToken.js";

router.get("/", tokenVerify, (req, res) => {
  res.json({ name: "omer", lastName: "colakoglu" });
});

export default router;
