const { EventsModels } = require('../models/');

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
        const newEvent = Object.assign(req.body, {eventOwner: req.user.id});
        const event = await EventsModels.create(newEvent);
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getById(req,res){
    try {
        const id = req.params.id;
        const event = await EventsModels.findById(id);

        if(!event) {
            return res.status(404).json({ msg: `no events with id: ${ id }` });
        }
            res.status(200).json(event);
            
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

async function update(req,res){
    try {
        const id = req.params.id;
        const event = await EventsModels.findOneAndUpdate( { id }, req.body, {
            new: true,
            runValidators: true,
        });

        if(!event) {
            return res.status(404).json({ msg: `no events with id: ${ id }` });
        }
            res.status(200).json(event);
            
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getAll,
    create,
    update,
    getById,
}