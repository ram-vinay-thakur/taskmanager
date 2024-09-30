import express from "express";
import { addTask } from "../controllers/task.controller.js";
const taskrouter = express.Router();
import upload from "../utils/multer.js";

taskrouter.route('/add-task').post(upload.none(), addTask);

export default taskrouter;