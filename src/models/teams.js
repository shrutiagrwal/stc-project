const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },
    memberBranch: {
        type: String,
        required: true
    },
    memberYear: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    memberDescription: {
        type: String,
        required: true
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;