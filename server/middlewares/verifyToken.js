import jwt from "jsonwebtoken";

//req.header is checked by tokenVerify middleware then if all controls are passed,
//process will continue.
const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) throw new Error("Access Denied");
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    next({
      errorName: error.name,
      statusCode: 401,
      errorMessage: error.message,
    });
  }
};

export default tokenVerify;
