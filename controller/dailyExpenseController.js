const DailyXpnse = require('../model/dailyExpense.js');
const moment = require('moment');
const toUID = require("../utils/toUID.js");

module.exports.getExpenseByDate = async (req, res) => {
    let { uid, currdate } = req.body;
    try {
        uid = await toUID(uid);
        currdate = new Date(currdate);
        const startDate = new Date(currdate.getFullYear(), currdate.getMonth(), currdate.getDate(), 0, 0, 0);
        const endDate = new Date(currdate.getFullYear(), currdate.getMonth(), currdate.getDate(), 23, 59, 59);
        const response = await DailyXpnse.find({
            uid: uid,
            paidAt: {
                $gte: startDate,
                $lte: endDate,
            }
        }).sort({ paidAt: -1 });
        if (response)
            return res.send({ status: 'success', data: response });
    } catch (err) {
        return res.status(401).send({ status: 'expired' });
    }
};

module.exports.create = async (req, res) => {
    let { uid, paidTo, amount, note, label, proof } = req.body;
    try {
        uid = await toUID(uid);
        const addXpense = await DailyXpnse.create({
            uid: uid,
            payeeName: paidTo,
            amount: amount,
            note: note,
            label: label,
            proof: proof
        });
        if (addXpense) {
            return res.status(200).json({ status: 'success', data: addXpense });
        }
    } catch (err) {
        return res.json({ status: 'failed', msg: `Failed: ${err}` });
    }
};