import jwl from "jsonwebtoken";
import User from "../model/user";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwl.verify(token, process.env.JWT_SECREAT_TOKEN);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error : Please authenticate!");
  }
};

module.exports = auth;
