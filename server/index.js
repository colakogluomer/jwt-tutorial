const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
const secretDataRoute = require("./routes/secretDatas");
const errorHandling = require("./middlewares/errorHandling");
const passportStrategy = require("./config/passport");
const ApiError = require("./utils/ApiError");

//Configurations and middlewares
const app = express();
dotenv.config();
passportStrategy(passport);
app.use(passport.initialize());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Route Middlewares

app.use("/api/user", authRoute);
app.use("/api/datas", secretDataRoute);
app.get("/", (req, res, next) => {
  res.send("Hello there");
});
app.use(() => {
  throw new ApiError(404, "Page Not Found.");
});

//Error Handling middleware
app.use(errorHandling);

//Connect to database and then server is listened
const PORT = process.env.PORT;
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  )
  .catch((error) => console.log(error.message));
