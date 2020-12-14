const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Students' },
    feedback: [{ type: String }],
    resolved: [{ type: Boolean, required: true, default: false }],
    createdAt: {type: Date, default: Date.now}
})
const feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = feedback;