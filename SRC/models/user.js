const { ObjectID } = require('bson');
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

//comparamos las password
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
} 


module.exports = model('user', userSchema);











