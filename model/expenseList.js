const mongoose = require('mongoose');

const expenseListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    isStarred: {
        type: Boolean,
        required: true,
    },
    expenseType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('expenseList', expenseListSchema);