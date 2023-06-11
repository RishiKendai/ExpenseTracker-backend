const mongoose = require('mongoose');

const expenseModel = new mongoose.Schema({
    payeeName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    expenseType: {
        type: String,
        required: true,
    },
    expenseId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    paidAt: {
        type: Date,
        default: Date.now,
    },
    note: {
        type: String,
    },
    label: {
        type: Object,
        required: true,
    },
    proof: {
        type: Object,
    },
});

module.exports = mongoose.model('Expense', expenseModel);