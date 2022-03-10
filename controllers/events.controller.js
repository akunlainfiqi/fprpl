const { EventsModels } = require('../models');

async function getAll(req,res){
    try {
        const events = await EventsModels.find({});
        if(!events) res.status(200).json("no events found");
        res.status(200).json(events);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function create(req,res){
    try { 
        const newEvent = Object.assign(req.body,{eventOwner: req.user.id});
        const event = await EventsModels.create(newEvent);
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    create,
}