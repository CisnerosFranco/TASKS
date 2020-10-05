const { ObjectID } = require('bson');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    }
})


module.exports = model('board', boardSchema);


