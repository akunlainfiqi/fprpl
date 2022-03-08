const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    eventName: { type: String, required: [true, 'Must provide event name!'] },
    amountToReach: { type: Integer, required: [true, 'Must provide amount to reach!'] },
    description: { type: String, required: [true, 'Must provide description!'] },
    amountReached: { type: Integer, required: [true, 'Must provide amount reached!'] },
    deadline: { type: Date, required: [true, 'Must provide deadline!'] },
    donators: { type: Integer, required: [true, 'Must provide amount of donators'] },
    eventUpdates: { type: String, required: [true, 'Must provide event update(s)!'] },
});

module.exports = mongoose.model('Event', eventsSchema);