const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    libraryId: {
        type: String,
        required: true
    },
    feedbackId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
        required: true
    }]
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;