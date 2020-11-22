const mongoose = require('mongoose');

const synopsisSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    totalSelections: {
        type: Number,
        required: true
    }
});

const Synopsis = mongoose.model('Synopsis', synopsisSchema);

module.exports = Synopsis;