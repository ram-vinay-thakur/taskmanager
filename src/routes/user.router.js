import express from "express";
import upload from "../utils/multer.js";
import { registerEmail, registerUserInfo } from "../controllers/user.controller.js";
import { sessionSecure, credentialSecure } from "../middlewares/sessionauth.js";
const userRouter = express.Router();

userRouter.route('/register/credentials')
    .post(upload.none(), registerEmail)
    .get(credentialSecure, (req, res) => {
        res.render('login1');
    })
userRouter.route('/register/userInfo')
    .post(upload.single('avatar'), registerUserInfo)
    .get(sessionSecure, (req, res) => {
        res.render('login2');
    })

export default userRouter;