import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    password: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
    },
    gender: {
        type: String,
    },
    avatar: {
        type: [String]
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const userModel = mongoose.model('users', userSchema);