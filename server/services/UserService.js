import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

// I suggest that if you need constructor function, you can use classes.
// I just tried class usage. If you want to use functions, you can use.
class UserService {
  //We inject UserModel in order to use in this class
  model = UserModel;
  //Login process.
  async login({ email, password }) {
    //Checking user.
    const oldUser = await this.model.findOne({ email });
    if (!oldUser) throw new ApiError(404, "User does not exist");
    //Checking password.
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) throw new ApiError(404, "Password is not correct");
    //If all controls are passed, we can create a token in order to use the session process.
    const token = jwt.sign({ _id: oldUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return token;
  }
  //Register process.
  async register({ name, email, password, date }) {
    //Hashing password due to provide security.
    const hashedPassword = await bcrypt.hash(password, 12);
    //Controlling whether user already exists or not.
    const checkUser = await this.model.findOne({ email });
    if (checkUser) throw new ApiError(409, "User already exist");
    //If control is passed, we can create a new user.
    const newUser = await this.model.create({
      name,
      email,
      password: hashedPassword,
      date,
    });
    return newUser;
  }
}

export default new UserService();
