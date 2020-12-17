const express = require('express')
const router = express.Router();
const auth = require('../auth/StudentAuth')
const Feedback = require('../models/feedback')
const mongoose = require('mongoose')
const Student = require('../models/students')

//get all feedbacks
router.get('/', auth, async(req, res) => {
    try {
        let libraryId = req.user.libraryId;
        let student = await Student.findOne({ libraryId }).populate('feedbackId');
        res.send(student)
    } catch (err) {
        res.status(400).send({ 'data': 'null', 'error': 'error' });
    }
});

//add feedback
router.post('/add', auth, async(req, res) => {
    let feedback = new Feedback({ feedbackText: req.body.text })
    let libraryId = req.user.libraryId;
    let student = await Student.findOne({ libraryId });
    if (student.length === 0)
        throw new Error;
    try {
        feedback = await feedback.save();
        // console.log(feedback)
        await student.updateOne({
            "$push": { feedbackId: feedback._id }
        })
        res.status(200).send({ 'data': 'feedback saved..!!' });
    } catch (err) {
        res.status(400).send({ 'data': 'null', 'error': err });
    }
});



//get feedback by id
router.get('/:id', async(req, res) => {
    let feedback_id = req.params.id;
    try {
        const feedback = await Feedback.findById(feedback_id);
        res.send(feedback)
    } catch (err) {
        res.status(400).send({ 'data': 'null', 'error': 'there is no such feedback' });
    }
});

module.exports = router