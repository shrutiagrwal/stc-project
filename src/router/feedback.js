const express = require('express')
const Feedback = require('../models/feedback')
const auth = require('../auth/StudentAuth')
const router = new express.Router()

router.post('/feedback/add',auth, async(req, res) => {
    const feedback = new Feedback(req.body)
    try{
        await feedback.save();
        res.status(200).send(feedback);
    } 
    catch(err) {
        res.status(400).send(err);
    }
});

router.get('/feedback', async(req, res)=> {
    try{
        const feedback = await Feedback.find({});
        res.send('feedback');
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get('/feedback/:id', async(req, res)=> {
    const feedback_id = req.params.id;
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

module.exports = router;
