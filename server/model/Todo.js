import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    tags: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
TodoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Add text index for search functionality
TodoSchema.index({ data: 'text' });
TodoSchema.index({ priority: 1 });
TodoSchema.index({ createdAt: -1 });

const todo = mongoose.model('todo', TodoSchema);

export default todo;