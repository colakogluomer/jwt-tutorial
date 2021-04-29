import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

//req.header is checked by tokenVerify middleware then if all controls are passed,
//process will continue.
const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) throw new Error();
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    throw new ApiError(403, "access denied!");
  }
};

export default tokenVerify;
