import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from '../utils/ApiResponse.utils.js';
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const registerEmail = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Email and password are required!"));
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json(new ApiError(400, "Email already exists"));
        }

        const newUser = new userModel({ email, password });
        await newUser.save({ validateBeforeSave: false })
        req.session.startedRegistration = true;
        req.session.userId = newUser._id;
        return res.status(201).json(new ApiResponse(201, null, 'ok'));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error!"));
    }
};

const registerUserInfo = async function (req, res) {
    try {
        console.log(req.body, req.file)
        const { name, DOB, gender } = req.body;

        const avatar = req.file.path;
        const cloudinaryupload = await uploadOnCloudinary(avatar);
        const avatarArr = [cloudinaryupload.public_id, cloudinaryupload.url];

        const userId = req.session.userId;
        console.log(userId)
        if (!userId) {
            return res.status(400).json(new ApiError(400, "Error!"));
        }

        if (!name || !DOB || !gender) {
            return res.status(400).json(new ApiError(400, "Name, Date of Birth, and Gender are required."));
        }


        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, DOB: new Date(DOB), gender, avatar: avatarArr },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json(new ApiError(404, "User not found."));
        }
        const saved_user = await userModel.findById(userId).select(" -password -refreshToken ");
        req.session.completedRegistration = true;
        req.session.userId = saved_user._id;
        return res.status(200).json(new ApiResponse(200, saved_user, "User information updated successfully."));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};

const userLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json(new ApiError(400, "Email is required."));
        }
        if (!password) {
            return res.status(400).json(new ApiError(400, "Password is required."));
        }

        const userExists = await userModel.findOne({ email }).select(" -password -refreshToken");
        if (!userExists) {
            return res.status(404).json(new ApiError(404, "User not found."));
        }

        const correctPassword = await userExists.isPasswordCorrect(password);
        if (!correctPassword) {
            return res.status(400).json(new ApiError(400, "Incorrect Password."))
        }
        req.session.userId = userExists._id;
        req.session.userLoggedIn = true;
        return res.status(200).json(new ApiResponse(200, userExists, "User Logged In Successfully!"))
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, error))
    }
}

const Logout = async function (req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).json(new ApiError(500, "Logout failed. Try again."));
        }
        // Optionally, clear the cookie
        res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name

        return res.status(200).json(new ApiResponse(200, {}, "User Logged Out Successfully."));
    });
};

const getFullUser = async function (req, res) {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/user/register/credentials');
        }

        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json(new ApiError(400, "Invalid User ID."));
        }

        const user = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$user", "$$userId"] }
                            }
                        }
                    ],
                    as: "tasks"
                }
            },
            {
                $addFields: {
                    totalTasks: { $size: "$tasks" },
                    inCompleteTasks: {
                        $filter: {
                            input: "$tasks",
                            as: "task",
                            cond: {
                                $eq: ["$$task.isComplete", false]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    password: 0,
                    refreshToken: 0
                }
            }
        ]);

        if (user.length === 0) {
            return res.status(404).json(new ApiError(404, "User not found."));
        }

        if (req.query.json === "true") {
            return res.status(200).json(new ApiResponse(200, user[0], "User Data Retrieved Successfully."));
        } else {
            return res.render('home', { user: user[0] });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error."));
    }
};

export {
    registerEmail,
    registerUserInfo,
    userLogin,
    Logout,
    getFullUser,
};
