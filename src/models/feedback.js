const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    feedbackText: { type: String },
    resolved: { type: Boolean, required: true, default: false }
})
const feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = feedback;