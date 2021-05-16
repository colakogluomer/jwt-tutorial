import jsonwebtoken from "jsonwebtoken";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

export function generateToken(user) {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
