const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    libraryId: {
        type: String,
        required: true
    },
    feedback: {
        type: Array,
        required: true
    }
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;