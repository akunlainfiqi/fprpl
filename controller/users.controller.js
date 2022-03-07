require('mongoose');
const { Users } = require('../models')

const findOneByEmail = (email) => {
    try {
        const user = Users.findOne({email: email});
        return user;
    } catch (err) {
        return 0;
    }    
}

module.exports = {
    findOneByEmail,
}