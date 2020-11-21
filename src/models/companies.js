const mongoose = require('mongoose');
const CompaniesSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    About: { type: String, required: true },
    Class: { type: String, required: true },
    Logo: { type: String, required: true },
    About: { type: String, required: true },
    Website: { type: String, required: true },
    UploadDate: { type: Date, default: Date.now() },
    Reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reports" }]
})
let companies = mongoose.model('Companies', CompaniesSchema)
module.exports = companies