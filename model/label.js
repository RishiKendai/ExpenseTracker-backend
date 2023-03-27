const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    color: {
        hue: {
            type: Number,
            required: true
        },
        saturation: {
            type: Number,
            required: true
        },
        lightness: {
            type: Number,
            required: true
        },
    },
    access: {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: function (v) {
                return typeof v === "string" || mongoose.Types.ObjectId.isValid(v);
            },
        },
    },
});
module.exports = mongoose.model('label', labelSchema);