const { default: mongoose } = require("mongoose");
const XpnseModel = require('../model/expense');
const toUID = require("../utils/toUID.js");
const numeral = require('numeral');
const XpnseListModel = require('../model/expenseList');
const Color = require('color');
const fs = require('fs');

module.exports.getAllList = async (req, res) => {
    try {

        const { id } = req.params;
        const data = await XpnseModel.find({ expenseId: new mongoose.Types.ObjectId(id) });
        res.status(200).json({ status: 'success', data: data });
    }
    catch (err) {
        console.log(err);
    }
};

module.exports.create = async (req, res) => {
    let { uid, paidTo, amount, expenseType, note, label, proof } = req.body;
    try {
        const path = '../assets';
        const fileName = `${path}/${uid}`;
        fs.writeFile('./out.png', req.body.imgsource, 'base64', (err) => {
            if (err) throw err;
        });
        // const addXpense = await XpnseModel.create({
        //     expenseId: uid,
        //     payeeName: paidTo,
        //     amount: +amount,
        //     expenseType: expenseType,
        //     note: note,
        //     label: label,
        //     proof: proof
        // });
        // if (addXpense) {
        //     return res.status(200).json({ status: 'success', data: addXpense });
        // }
    } catch (err) {
        console.log('addExpense ', err);
        return res.json({ status: 'failed', msg: `Failed: ${err}` });
    }
};

module.exports.insights = async (req, res) => {
    try {
        const { expenseId } = req.body;
        let response = await XpnseListModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(expenseId)
                }
            },
            {
                $lookup: {
                    from: 'expenses',
                    localField: '_id',
                    foreignField: 'expenseId',
                    as: 'expenses',
                }
            },
            {
                $project: {
                    name: "$name",
                    expenseType: '$expenseType',
                    totalAmount: '$amount',
                    expenses: '$expenses',
                    amountSpent: {
                        $sum: "$expenses.amount"
                    },
                }
            }
        ]);
        response = response[0];
        if (response.amountSpent === 0) return res.status(200).json({ status: 'success', data: [] });
        const expenses = response.expenses.map(e => {
            delete e._id;
            delete e.__v;
            delete e.note;
            delete e.label.access;
            delete e.proof;
            return e;
        });
        response.balance = response.totalAmount - response.amountSpent;
        let highestExpense = expenses[0];
        let leastExpense = expenses[0];
        const pieCharDataObject = {};

        expenses.map(data => {
            if (data.amount >= highestExpense.amount) highestExpense = { payeeName: data.payeeName, amount: data.amount, label: data.label.name };
            if (data.amount <= leastExpense.amount) leastExpense = { payeeName: data.payeeName, amount: data.amount, label: data.label.name };
            const id = data.label._id;
            if (!pieCharDataObject[id]) {
                const color = Color.hsl(data.label.color.hue, data.label.color.saturation, data.label.color.lightness, 0.8);
                pieCharDataObject[id] = {
                    name: data.label.name,
                    amount: 0,
                    color: color.rgb().string(),
                    legendFontColor: "#fefeff",
                    legendFontSize: 15,
                };
            }
            pieCharDataObject[id].amount += data.amount;
        });

        const groupedData = expenses.reduce((result, expense) => {
            const paidAt = new Date(expense.paidAt).toLocaleDateString();
            if (!result[paidAt]) {
                result[paidAt] = [];
            }
            result[paidAt].push(expense);
            return result;
        }, {});

        const reducedExpenses = Object.keys(groupedData).reduce((result, key) => {
            const expenses = groupedData[key];
            const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            result[key] = totalAmount;
            return result;
        }, {});

        const lineChartData = {
            labels: Object.keys(reducedExpenses),
            datasets: [
                {
                    data: Object.values(reducedExpenses),
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                }
            ],
            // legend: ["Amount in ₹"]
        };
        response.lineChartData = lineChartData;
        response.highestExpense = highestExpense;
        response.leastExpense = leastExpense;
        response.pieChartData = Object.values(pieCharDataObject);
        res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        console.log(err);
    }
};