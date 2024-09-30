import express from "express";
import { getFullUser } from "../controllers/user.controller.js";
const pagerouter = express.Router();

pagerouter.route('/').get(getFullUser);
pagerouter.route('/get-user').get(getFullUser)

export default pagerouter;