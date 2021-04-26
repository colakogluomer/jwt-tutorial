import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  model = UserModel;

  async login({ email, password }) {
    const oldUser = await this.model.findOne({ email });

    if (!oldUser) throw new Error("User does not exist");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) throw new Error("Password is not correct");

    const token = jwt.sign({ _id: oldUser._id }, process.env.SECRET_KEY);

    return token;
  }

  async register({ name, email, password, date }) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const checkUser = await this.model.findOne({ email });

    if (checkUser) throw new Error("User already exist");

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
