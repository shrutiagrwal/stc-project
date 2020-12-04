const express = require('express')
const router = express.Router();
const Report = require('../models/reports')
const auth = require('../auth/StudentAuth')

router.get('/reports', auth, async(req, res) => {
    try{
        const reports = await Report.find({});
        res.send('reports');
    }
    catch(err){
        res.status(400).send(err);
    }
})

router.get('/report/:id', async(req, res)=> {
    const report_id = req.params.id;
    try{
        const report = await Report.findById(report_id) ;
        if(!report){
        return res.status(404).send();
        }
        else{
            res.send(report);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;