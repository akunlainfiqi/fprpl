const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    name: { type: String, required: [false] },
    isDonate: { type: Boolean, required: [true, 'Must provide isDonate!'] },
    donateAmount: { type: Number, required: [true, 'Must provide donate amount!'] },
    message: { type: String, required: [false] },
    bankNum: { type: String, required: [true, 'Must provide date of bank number!'] },
    donateTime: { type: Date, required: [true, 'Must provide donate time'] }
});

module.exports = mongoose.model('Transaction', transactionsSchema);