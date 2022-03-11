const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var validateEmail = (value) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    return re.test(value)
}

const UsersSchema = new mongoose.Schema({
    email : {
        type: String,
        required : 'Email is required',
        unique : true,
        lowercase: true,
        validate: [validateEmail, 'please fill a valid email address'],
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "please fill a valid email address"]
    },
    permissions : {
        type: Number,
        required: true,
        default : 1,
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    password : {
        type : String,
        required : true,
    },
    birthdate : {
        type : Date,
        default : Date.now
    },
    phoneNumber : Number,
    profilePicture : String,
    kodeRekening : Number,
    nomorRekening : Number,
})

UsersSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UsersSchema.methods.comparePassword = async (email,password) => {
    const user = await User.findOne({ email: email});
    return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model('User', UsersSchema)

module.exports = User;