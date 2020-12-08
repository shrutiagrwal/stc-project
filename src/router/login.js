const express = require('express');
const router = express.Router();
const axios = require('axios')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const Student = require('../models/students')
const { JWTPrivateKey: private } = require('../config');
const auth = require('../auth/StudentAuth');

//render the login form here
router.get('/login', (req, res) => {
    res.send({ 'data': "show login page" })
})
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

//check if username is valid or not according to api
router.post('/login', async(req, res) => {
    let headers = { 'authorization': req.headers.authorization }
    const url = 'https://tech.kiet.edu/api/hrms/login/'
    try {
        axios.post(url, null, { headers })
            .then(async(value) => {
                // value = value.json()
                // console.log(value)
                let message = value.data;
                if (message.msg === "Success") {
                    let student = await Student.find({ libraryId: message.data.lib_id })
                    if (student.length === 0) {
                        student = new Student({
                            libraryId: message.data.lib_id,
                            feedback: []
                        })
                        await student.save();
                    }
                    let payload = { username: message.data.lib_id }
                    let accesstoken = jwt.sign(payload, private)
                    res.status(201).append('Authorization', `Bearer ${accesstoken}`).send(`Bearer ${accesstoken}`)
                }
            })
            .catch((err) => {
                res.status(400).send('auth error')
            })
    } catch (err) {
        res.status(400).send('auth error')
    }
})
router.post('/logout', (req, res) => {

})
module.exports = router;