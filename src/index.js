const express = require('express');
const mongoDB = require('./db/mongoose')
const bodyParser = require('body-parser');
const login = require('./router/login')
const report = require('./router/reports')
const feedback = require('./router/feedback')

const home = require('./router/home')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//login route-------------------------
app.use('/api/student', login)

//show home page and search-----------
app.use('/api', home)

//reports route-----------------------
app.use('/api/reports', report)


//feedbacks route-----------------------
app.use('/api/feedback', feedback)

//mongoDB connection------------------
mongoDB();

//server start------------------------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})