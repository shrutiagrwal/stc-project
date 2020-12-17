const express = require('express')
const router = express.Router();
const auth = require('../auth/StudentAuth')
const Company = require('../models/companies')
const mongoose = require('mongoose')

//send all company names
router.get('/companies', async(req, res) => {
    try {
        let companies = await Company.find({}, { name: 1 })
        res.send(companies)
    } catch (err) {
        res.send('currently no companies are available')
    }
})

//send all reports with company
router.get('/companies/:name', auth, async(req, res) => {
    try {
        let name = req.params.name;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        let companies = await mongoose.model('Companies').aggregate(
            [{
                    "$lookup": {
                        from: "reports",
                        localField: "reports",
                        foreignField: "_id",
                        as: "AllReports"
                    }
                },
                { "$project": { reports: 0 } },
                { "$match": { name } }
            ]
        )
        if (companies.length === 0)
            res.send({ 'data': 'problem with name of the company' })
        res.send(companies)

    } catch (err) {
        console.log(err)
        res.send({ 'error': 'no data is available' })
    }
})

module.exports = router