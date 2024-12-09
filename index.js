const express = require('express');
const bodyParse = require('body-parser');
const StudentRouter = require('./student');
const ClasstRouter = require('./classes');
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use('/classes', ClasstRouter);
app.use('/student', StudentRouter);

app.get('/', (req, res) => {
    res.send('Access Successfully');
});

app.listen(3000, () => {
    console.log('Started Server');
});
