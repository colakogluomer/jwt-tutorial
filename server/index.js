import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import bodyParser from "body-parser";
import secretDataRoute from "./routes/secretDatas.js";
import errorHandling from "./middlewares/errorHandling.js";

//Configurations and middlewares
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/datas", secretDataRoute);
app.get("/", (req, res, next) => {
  res.send("Hello there");
});
app.use((req, res, next) => {
  res.send("404");
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
  .then(() => app.listen(PORT, () => console.log("Server listening")))
  .catch((error) => console.log(error.message));
