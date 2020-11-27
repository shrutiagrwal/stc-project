const express = require('express');
const mongoDB = require('./db/mongoose')
const bodyParser = require('body-parser');
const login = require('./router/login')
const report = require('./router/reports')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//login route-------------------------
app.use('/api/student', login)

//show home page----------------------
app.get('/home', (req, res) => {
    res.send({ 'data': 'show home page' })
})

//reports route-----------------------
app.use('/reports', report)
    //mongoDB connection------------------
mongoDB();

//server start------------------------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})