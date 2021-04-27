import express from "express";
const router = express.Router();
import tokenVerify from "../middlewares/verifyToken.js";

//Sample data.
//req.header is checked by tokenVerify middleware before response returns
router.get("/", tokenVerify, (req, res) => {
  res.json({ name: "omer", lastName: "colakoglu" });
});

export default router;
