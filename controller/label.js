// /api/label
const Label = require('../model/label');
const mongoose = require('mongoose');

/// (POST) Create label
module.exports.create = async (req, res) => {
    const id = req.id;
    const { name, color } = req.body;
    /*
    name: "Rent",
    color: {
        hue:210,
        saturation:70,
        lightness:50
    }
    */
    try {

        const label = await Label.create({ name, color, access: new mongoose.Types.ObjectId(id) });
        res.status(200).json({ status: true, msg: `label ${label.name} created` });
    } catch (err) {
        console.log('error: ', err);
        return res.json({ status: false, msg: "Couldn't create label" });
    }

};

/// (POST) Edit label
module.exports.edit = async (req, res) => {
    const labelId = req.params.labelId;
    const updateField = req.body;
    try {
        const result = await Label.findOneAndUpdate({ _id: labelId }, { $set: updateField }, { new: true });
        return res.status(200).json({ status: true, label: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Could not update label." });
    }
};

/// (GET) Get all label names
module.exports.getAllLabels = async (req, res) => {
    const id = req.id;
    console.log(id);
    const data = await Label.find({
        access: { $in: ["ANY", new mongoose.Types.ObjectId(id)] },
    });
    return res.status(200).json({ labels: data });
};