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

// get all feedbacks
router.get('/',auth, async(req, res)=>{
    try {
        let feedback = await mongoose.model("Feedback").aggregate(
            [{
                    "$lookup": {
                        from: "students",
                        localField: "studentId",
                        foreignField: '_id',
                        as: 'StudentDetails'
                    }
                },
                { "$group": { _id: "$StudentDetails.libraryId", feedback: { $push: "$$ROOT" } } },
                { "$sort": { "students.createdAt": -1 } }
            ]
        )
        res.send(feedback)

    } catch (err) {
        console.log(err)
        res.send({ 'error': 'no data is available' })
    }
})

//get feedbacks by id
router.get('/:id',auth, async(req, res)=> {
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