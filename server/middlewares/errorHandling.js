//This is error handling middleware.
const errorHandle = (err, req, res, next) => {
  res.status(err.statusCode).json(err);
};
export default errorHandle;
