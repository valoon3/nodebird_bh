const express = require('express');
const postRouter = require('./routes/post')
const db = require('./models');

const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch((err) => console.log('시퀄라이즈 에러 : ', err))

app.use('/post', postRouter); // /post 가 prefix가 된다.

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/json', (req, res) => {
    res.json([
        { id: 1, content: 'hello'},
        { id: 2, content: 'bye'},
        { id: 3, content: 'tt'},
    ])
});




app.listen(8080 ,() => console.log('server start'));