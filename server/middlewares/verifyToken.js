import jwt from "jsonwebtoken";

//req.header is checked by tokenVerify middleware then if all controls are passed,
//it will return a verified response.
const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Denied");
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
