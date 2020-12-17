const express = require('express');
const router = express.Router()
const Company = require('../models/companies')
const Report = require('../models/reports')
const auth = require('../auth/StudentAuth')
const mongoose = require('mongoose')

router.get('/home', (req, res) => {
    res.send({ 'data': 'show home page' })
})

router.post('/search', auth, async(req, res) => {
    try {
        let name = req.body.company;
        companies = await mongoose.model('Companies').aggregate(
            [{
                    "$lookup": {
                        from: "reports",
                        localField: "reports",
                        foreignField: "_id",
                        as: "AllReports"
                    }
                },
                { "$project": { reports: 0 } },
                { $addFields: { results: { $regexMatch: { input: "$Name", regex: `.*${name}.*` } } } }
            ]
        )
        res.send(companies)

    } catch (err) {
        console.log(err)
        res.send({ 'error': 'no reports available for the company' })
    }

})
module.exports = router