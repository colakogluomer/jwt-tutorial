const express = require("express");
const router = express.Router();
const passport = require("passport");

//Sample data.
//req.header is checked by tokenVerify middleware before response returns
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ name: "omer", lastName: "colakoglu" });
  }
);

module.exports = router;
