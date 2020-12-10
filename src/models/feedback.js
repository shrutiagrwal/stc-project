const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Students' },
    feedback: [{ type: String }],
    resolved: [{ type: Boolean, required: true, default: false }]
})
const feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = feedback;