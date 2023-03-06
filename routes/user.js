import { express } from "express";

export const userRouter = express.Route(); 

userRouter.get('/:username', async(req, res) =>{
    let username = req.get.params.username;
    if(username == "sunny") {
        res.status(200).send({ username, "role": "admin" });
    } else {
        res.status(200).send({ username, "role": "user" });
    }
} )