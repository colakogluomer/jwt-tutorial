import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const passportStrategy = (passport) => {
  passport.use(
    new Strategy(options, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};

export default passportStrategy;
