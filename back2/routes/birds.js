const express = require('express');
const router = express.Router();

// 미들웨어 명시 라우터
router.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
});

// 홈페이지 정의
router.get('/', (req, res) => {
    res.send('Birds home page');
});

// 다른 라우터 정의
router.get('/about', (req, res) => {
    res.send('About birds');
});

module.exports = router;

/*
* 이후 앱 내에서 다음과 같이 라우터 모듈을 로드하십시오.
* const birds = require('./url');
* app.use('birds', birds);
* */


