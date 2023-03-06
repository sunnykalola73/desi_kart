import express from "express";

export const userRouter = express.Router();

userRouter.get("/:username", async (req, res) => {
	let username = req.params.username;
	if (username == "sunny") {
		res.status(200).send({ username, role: "admin" });
	} else {
		res.status(200).send({ username, role: "user" });
	}
});

userRouter.get("/userid", async (req, res) => {
    res.status(200).send({ username: "useradmin", role: "admin" });
});

userRouter.get("/", async (req, res) => {
	res.status(200).send({ username: "admin", role: "admin" });
});
