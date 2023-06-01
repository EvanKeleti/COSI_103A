const express = require('express');
const router = express.Router();
const TransactionItem = require('../models/TransactionItem')
const User = require('../models/User');
const { isLoggedIn } = require('./pwauth');
const mongoose = require('mongoose');

router.get('/transaction', isLoggedIn, async (req, res, next) => {
	let sortOptions = {};
	sortOptions[req.query.sortBy] = 1;
	let transactions = await TransactionItem.find({ userId: req.user._id }).sort(sortOptions)
	//res.json(transactions)
	res.render('transaction', { transactions });
})

router.post('/transaction', isLoggedIn, async (req, res, next) => {
	const transaction = new TransactionItem({
		description: req.body.description,
		category: req.body.category,
		amount: parseFloat(req.body.amount),
		date: new Date(req.body.date),
		userId: req.user._id
	})
	await transaction.save();
	res.redirect('/transaction');
})

router.get('/transaction/groupByCategory', isLoggedIn, async (req, res, next) => {
	let categories = await TransactionItem.aggregate([
		{ $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
		{ $group: {
			_id: "$category",
			total: { $sum: "$amount" }
		}},
		{ $sort: { _id: 1 } }
	]);
	//res.json(categories);
	res.render('transactionsByCategory', { categories });
})

router.get('/transaction/delete/:transactionId', isLoggedIn, async (req, res, next) => {
	await TransactionItem.deleteOne({ _id: req.params.transactionId });
	res.redirect('/transaction');
})

router.get('/transaction/edit/:transactionId', isLoggedIn, async (req, res, next) => {
	const transaction = await TransactionItem.findById(req.params.transactionId);
	res.render('editTransaction', { transaction });
})

router.post('/transaction/updateTransactionItem', isLoggedIn, async (req, res, next) => {
	const { transactionId, description, category, amount, date } = req.body;
	await TransactionItem.findOneAndUpdate(
		{ _id: transactionId },
		{ $set: { description, category, amount, date: new Date(date) } }
	)
	res.redirect('/transaction')
})

module.exports = router;