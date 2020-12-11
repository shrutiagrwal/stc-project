const express = require('express')
const router = express.Router();
const auth = require('../auth/StudentAuth')
const Company = require('../models/companies')
const Report = require('../models/reports')
const mongoose = require('mongoose')

//get all reports
router.get('/',auth, async(req, res) => {
    try{
        const reports = await Report.find({});
        if(!reports){
            return res.status(404).send({ 'error': 'no data is available' });
        }
        else{
            res.send(reports);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

//get reports by id
router.get('/:id',auth, async(req, res)=> {
    const report_id = req.params.id;
    try{
        const report = await Report.findById(report_id) ;
        if(!report){
            return res.status(404).send({ 'error': 'no data is available' });
        }
        else{
            res.send(report);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

//getting reports by companies
router.get('/companies', auth, async(req, res) => {
    try {
        let reports = await mongoose.model("Reports").aggregate(
            [{
                    "$lookup": {
                        from: "companies",
                        localField: "companyId",
                        foreignField: '_id',
                        as: 'CompanyDetails'
                    }
                },
                { "$group": { _id: "$CompanyDetails.name", reports: { $push: "$$ROOT" } } },
                { "$sort": { _id: 1 } }
            ]
        )

        res.send(reports)

    } catch (err) {
        console.log(err)
        res.send({ 'error': 'no data is available' })
    }
})

module.exports = router