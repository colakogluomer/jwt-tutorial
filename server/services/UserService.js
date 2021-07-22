const BaseService = require("./BaseService");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const tokenGenerator = require("../utils/tokenGenerator");
const passwordProcesses = require("../utils/passwordProcesses.js");
// I suggest that if you need constructor function, you can use classes.
// I just tried class usage. If you want to use functions, you can use.
class UserService extends BaseService {
  //Login process.
  async login({ email, password }) {
    //Checking user.

    const oldUser = await this.find({ email: email });
    console.log(oldUser);
    if (oldUser == null) throw new ApiError(404, "User does not exist");
    //Checking password.
    const isPasswordCorrect = passwordProcesses.checkPassword(
      password,
      oldUser.hash,
      oldUser.salt
    );
    if (!isPasswordCorrect) throw new ApiError(404, "Password is not correct");
    //If all controls are passed, we can create a token in order to use the session process.
    const token = tokenGenerator.generateToken(oldUser);
    return token;
  }
  //Register process.
  async register({ name, email, password, date }) {
    //console.log(date);
    //Controlling whether user already exists or not.

    const checkUser = await this.find({ email: email });
    console.log(checkUser);
    if (checkUser) throw new ApiError(409, "User already exist");
    //Hashing password due to provide security.
    const saltHash = passwordProcesses.generatePassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    //If control is passed, we can create a new user.
    try {
      const newUser = await this.insert({
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

module.exports = new UserService(User);
