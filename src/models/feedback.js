const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    feedback: [{ type: String }]
})
const feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = feedback;