const { ObjectID, ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'slopes'
    },
    board: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    edited: {
        type: String,
        default: ''
    }
})

module.exports = model('task',taskSchema);






