const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    incomes: [
        {
            amount: Number,
            description: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    expenses: [
        {
            amount: Number,
            description: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
