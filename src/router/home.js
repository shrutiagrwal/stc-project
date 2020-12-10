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
        name = name.charAt(0).toUpperCase() + name.slice(1);
        let companies = await Company.find({ name })
        if (companies.length === 0)
            return res.send({ data: 'No result available' })

        let reports = await mongoose.model("Reports").aggregate(
            [{
                "$lookup": {
                    from: "companies",
                    localField: "companyId",
                    foreignField: '_id',
                    as: 'CompanyDetails'
                }
            }]
        )
        res.send(reports)
    } catch (err) {
        res.send({ 'error': 'no reports available for the company' })
    }

})
module.exports = router