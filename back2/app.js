const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/api', (req, res) => {
    res.send('api express');
    res.json([
        {}
    ])
})

app.listen(port, () => {
    console.log('서버 실행 중');
})