import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
    },
    tags: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed'],
        default: 'not started'
    },
    attachments: [{
        filename: String,
        path: String
    }],
    estimatedTime: {
        type: Number, // Estimated time in hours or minutes
    }
}, { timestamps: true });

const Task = mongoose.model('tasks', taskSchema);

export default Task;
