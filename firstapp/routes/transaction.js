const express = require('express');
const router = express.Router();
const TransactionItem = require('../models/TransactionItem')
const User = require('../models/User')

router.get('/transaction', isLoggedIn, async (req, res, next) => {
	let sortOptions = {};
	sortOptions[req.query.sortBy] = 1;
	let transactions = await TransactionItem.find({ userId: req.user._id }).sort(sortOptions)
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
	
})

module.exports = router;