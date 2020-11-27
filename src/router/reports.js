const express = require('express')
const router = express.Router();
const auth = require('../auth/StudentAuth')
router.get('/companies', auth, async(req, res) => {

})




module.exports = router