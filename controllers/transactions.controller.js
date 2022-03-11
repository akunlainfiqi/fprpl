const { TransactionsModels } = require('../models/');

async function getAll(req,res){
    try {
        const transactions = await TransactionsModels.find({});
        if(!transactions) res.status(200).json("no transactions found");
        res.status(200).json(transactions);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function createWithdraw(req,res){
    try { 
        const newTransactions = Object.assign(req.body, {eventOwner: req.user.id});
        const transaction = await TransactionsModels.create(newTransactions);
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function createDonate(req,res){
    try { 
        const transaction = await TransactionsModels.create(req.body);
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    createDonate,
    createWithdraw
};