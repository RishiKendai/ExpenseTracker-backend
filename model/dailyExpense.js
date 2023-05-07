const mongoose = require('mongoose');

const dailyExpSchema = new mongoose.Schema({
    uid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    payeeName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
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
module.exports = mongoose.model('Dailyxpnse', dailyExpSchema);