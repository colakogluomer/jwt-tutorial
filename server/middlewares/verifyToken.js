import jwt from "jsonwebtoken";

const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Denied");
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400);
  }
};

export default tokenVerify;
