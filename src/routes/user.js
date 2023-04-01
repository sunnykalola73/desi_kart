import express from "express";
import User from "../model/user";
import auth from "../middleware/auth";
import { sendWelcomeEmail } from "../emails/account";
export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    const existUser = await User.findOne({ email: user.email });
    if (existUser) {
      throw new Error("Oops! Email already exist!");
    }
    await user.save();
    // sendWelcomeEmail(user.email,user.fname,user.lname)
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("Logout done!");
  } catch (error) {
    res.status(500).send(error);
  }
});

// userRouter.get("/profile", auth, async (req, res) => {
//   try {
//     res.status(200).send(req.user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// userRouter.patch("/profile", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdate = [
//     "fname",
//     "lname",
//     "mobileno",
//     "addressline1",
//     "addressline2",
//     "city",
//     "province",
//     "country",
//     "pincode",
//   ];
//   const isValidaUpdate = updates.every((update) => {
//     return allowedUpdate.includes(update);
//   });

//   if (!isValidaUpdate) {
//     return res.status(400).send("Cannot perform update user!");
//   }
//   try {
//     updates.forEach((update) => (req.user[update] = req.body[update]));

//     await req.user.save();
//     res.send(req.user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
