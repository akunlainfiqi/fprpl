const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'Must provide email!'], unique: true},
    firstName: { type: String, required: [true, 'Must provide first name!'] },
    lasttName: { type: String, required: [true, 'Must provide last name!'] },
    password: { type: String, required: [true, 'Must provide password!'] },
    dob: { type: Date, required: [true, 'Must provide date of birth!'] },
    phoneNum: { type: String, required: [true, 'Must provide date of phone number!'] },
    bankNum: { type: String, required: [true, 'Must provide date of bank number!'] },
});

module.exports = mongoose.model('User', UserSchema);