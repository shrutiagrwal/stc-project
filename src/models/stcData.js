const mongoose = require('mongoose');

const stcSchema = new mongoose.Schema({
    whatIsStc: {
        type: String,
        required: true,
    },
    whoAreWe: {
        type: String,
        required: true
    },
    disclaimer: {
        type: String,
        required: true
    },
    footerData: {
        type: String,
        required: true
    }
});

const Stc = mongoose.model('Stc', stcSchema);

module.exports = Stc;