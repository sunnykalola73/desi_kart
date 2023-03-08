import express from "express";
import User from "../model/user";
import auth from "../middleware/auth"
export const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        console.log("loging", req.body.email);
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

userRouter.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logout done!')
    } catch (error) {
        res.status(500).send(error)
    }
})

userRouter.get('/profile', auth, async (req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

userRouter.patch('/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidaUpdate = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidaUpdate) {
        return res.status(400).send('Error : Invalid updates:')
    }
    try {
        //const user = await User.findByIdAndUpdate(_id,req.body,{new:true, runValidators:true})

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})
// userRouter.get("/:username", async (req, res) => {
// 	let username = req.params.username;
// 	if (username == "sunny") {
// 		res.status(200).send({ username, role: "admin" });
// 	} else {
// 		res.status(200).send({ username, role: "user" });
// 	}
// });

// userRouter.get("/userid", async (req, res) => {
//     res.status(200).send({ username: "useradmin", role: "admin" });
// });

// userRouter.get("/", async (req, res) => {
// 	res.status(200).send({ username: "admin", role: "admin" });
// });
