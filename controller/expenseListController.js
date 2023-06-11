const { default: mongoose } = require("mongoose");
const XpnseListModel = require('../model/expenseList');
const toUID = require("../utils/toUID.js");
const numeral = require('numeral');
/**

 */
/// FETCH ALL LIST
module.exports.getAllList = async (req, res) => {
    try {
        const id = await toUID(req.params.id);
        const response = await XpnseListModel.aggregate([
            {
                $match: {
                    uid: new mongoose.Types.ObjectId(id) // Add this $match stage to filter by the id
                }
            },
            {
                $lookup: {
                    from: "expenses",
                    localField: "_id",
                    foreignField: "expenseId",
                    as: "expenses"
                }
            },
            {
                $project: {
                    name: "$name",
                    isStarred: "$isStarred",
                    transactions: {
                        $size: "$expenses"
                    },
                    amount: {
                        $sum: "$expenses.amount"
                    }
                }
            },
        ]);
        response.forEach(item => {
            item.amount = numeral(item.amount).format('0.0a').toLocaleUpperCase()
        })
        return res.status(200).json({ status: 'success', data: response });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ status: 'expired' });
    }
};

/// CREATE
module.exports.create = async (req, res) => {
    try {
        const uid = await toUID(req.params.uid);
        const { name, isStarred, targetXpnse, amount } = req.body;
        await XpnseListModel.create({ uid, name, isStarred, expenseType: targetXpnse ? 'target' : 'general', amount });
        return res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.json({ status: 'failed' });
    }
};

/// SET STAR
module.exports.setStarred = async (req, res) => {
    try {
        const id = req.params.id;
        const { star } = req.body;
        const response = await XpnseListModel.findByIdAndUpdate(id, { isStarred: star }, { new: true });
        return res.status(200).json({ status: 'success'});
    } catch (err) {
        console.log(err);
        return res.json({ status: 'failed' });
    }
};