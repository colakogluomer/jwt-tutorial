import express from "express";
const router = express.Router();
import passport from "passport";

//Sample data.
//req.header is checked by tokenVerify middleware before response returns
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ name: "omer", lastName: "colakoglu" });
  }
);

export default router;
