const express = require('express');
const app = express();
const port = 3000;

const birds = require('./routes/birds');

app.use('/birds', birds); // prefix 설정

app.get('/', (req, res) => {
    console.log('/');
    res.send('hello express');
})

app.get('/api', (req, res) => {
    console.log('/api');
    res.send('api express');
})

app.listen(port, () => {
    console.log('서버 실행 중');
})