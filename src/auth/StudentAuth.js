const jwt = require('jsonwebtoken')
const { JWTPrivateKey: private, JWTPrivateKey } = require('../config')
const Student = require('../models/students')
let auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        let student = jwt.verify(token, JWTPrivateKey)
        student = await Student.findOne({ libraryId: student.username })
        if (!student) { throw new error; }
        req.user = student;
        next();
    } catch (err) {
        res.status(401).send({ 'error': "not authenticated" })
    }
}
module.exports = auth;