import express from "express";
import upload from "../utils/multer.js";
import { registerEmail, registerUserInfo } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.route('/register/credentials').post(upload.none(), registerEmail)
userRouter.route('/register/userInfo').post(upload.single('avatar'), registerUserInfo);
userRouter.route('/register/credentials').get((req, res) => {
    res.render('login1');
})
userRouter.route('/register/userInfo').get((req, res) => {
    res.render('login2');
})

export default userRouter;