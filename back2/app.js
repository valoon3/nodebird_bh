const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/api', (req, res) => {
    res.send('api express');
    res.json([
        {}
    ])
})

app.listen(3000, () => {
    console.log('서버 실행 중');
})