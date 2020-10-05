const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TASKDB', { useNewUrlParser: true,  useUnifiedTopology: true} );

mongoose.connection.once('open', () => {
    console.log('CONNECTED TO THE DATABASE');
})

mongoose.connection.on('error', () => {
    console.log('ERROR IN THE CONNECTION TO THE DATABASE')
})












