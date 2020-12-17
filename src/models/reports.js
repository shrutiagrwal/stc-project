const mongoose = require('mongoose')
let ReportsSchema = mongoose.Schema({
    CostToCompany: { type: String, required: true },
    jobEligibility: { type: String, required: true },
    AddedBy: { type: String, required: true },
    Profile: { type: String, required: true },
    EstablishmentDate: { type: String, required: true },
    Batch: { type: String, required: true },
    Details: { type: String, required: true }
})
const reports = mongoose.model('Reports', ReportsSchema);
module.exports = reports;