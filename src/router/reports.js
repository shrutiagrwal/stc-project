const express = require('express')
const router = express.Router();
const auth = require('../auth/StudentAuth')
const Company = require('../models/companies')
const Report = require('../models/reports')
const mongoose = require('mongoose')
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