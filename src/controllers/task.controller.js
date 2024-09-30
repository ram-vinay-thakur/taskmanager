import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import { userModel } from "../models/user.model.js";

const addTask = async function (req, res) {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json(new ApiError(401, "Unauthorized: No user session found"));
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        const { title, content, priority, dueDate, tags, estimatedTime } = req.body;
        const task = new Task({
            user: userId,
            title: title,
            content: content,
            priority: priority,
            dueDate: dueDate,
            tags: tags,
            estimatedTime: estimatedTime,
        });
        await task.save();

        return res.status(201).json(new ApiResponse(201, "Task successfully added", task));

    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json(new ApiError(500, "An error occurred while adding the task"));
    }
};

export { addTask };