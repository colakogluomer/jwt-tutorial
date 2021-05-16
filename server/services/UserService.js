import UserModel from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/tokenGenerator.js";
import { checkPassword, generatePassword } from "../utils/password.js";

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
    const isPasswordCorrect = checkPassword(
      password,
      oldUser.hash,
      oldUser.salt
    );
    if (!isPasswordCorrect) throw new ApiError(404, "Password is not correct");
    //If all controls are passed, we can create a token in order to use the session process.
    const token = generateToken(oldUser);
    return token;
  }
  //Register process.
  async register({ name, email, password, date }) {
    //console.log(date);
    //Controlling whether user already exists or not.
    const checkUser = await this.model.findOne({ email });
    if (checkUser) throw new ApiError(409, "User already exist");
    //Hashing password due to provide security.
    const saltHash = generatePassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    //If control is passed, we can create a new user.
    try {
      const newUser = await this.model.create({
        email,
        name,
        hash,
        salt,
        date,
      });
      return newUser;
    } catch (error) {
      throw new ApiError(404, "Something went wrong");
    }
  }
}

export default new UserService();
