const { UsersModels } = require('../models/');

async function getUsersById(req,res){
    try {
        const users = await UsersModels.findById(req.params.id);
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getUsers(req,res){
    try{
        if(req.user)
            return res.status(200).json({
                user: req.user,
                token: req.query.secret_token
              });
        else 
            return res.json({user: null})
    } catch (err) {
        return res.status(500).send(err);
    }
}

async function getAllUsers(req,res){
    try{
        const users = await UsersModels.find({});
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports = {
    getUsers,
    getUsersById,
    getAllUsers,
};