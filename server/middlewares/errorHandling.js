//This is error handling middleware.
const errorHandle = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode).send(message);
};
export default errorHandle;
