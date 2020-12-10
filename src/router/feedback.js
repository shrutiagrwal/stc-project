const express = require('express')
const router = express.Router();
const auth = require('../auth/StudentAuth')
const Feedback = require('../models/feedback')
const mongoose = require('mongoose')

//add feedback
router.post('/add',auth, async(req, res) => {
    const feedback = new Feedback(req.body)
    try{
        await feedback.save();
        res.status(200).send(feedback);
    } 
    catch(err) {
        res.status(400).send(err);
    }
});

//get all feedbacks
router.get('/', async(req, res)=> {
    try{
        const feedback = await Feedback.find({});
        if(!feedback){
            return res.status(404).send({ 'error': 'no data is available' });
        }
        else{
            res.send(feedback);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

//get feedbacks by id
router.get('/:id', async(req, res)=> {
    const feedback_id = req.params.id;
    if (feedback_id.length === 0){
        return res.send({ data: 'No result available' })
    }

    try{
        const feedback = await Feedback.findById(feedback_id) ;
        if(!feedback){
        return res.status(404).send();
        }
        else{
            res.send(feedback);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router