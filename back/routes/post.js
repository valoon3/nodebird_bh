const express = require('express');

const router = express.Router();

// POST/post
router.post('/', (req, res) => {
    res.send('hello node');

});

// DELETE/post
router.delete('/', (req, res) => {
    res.json([
        {id: 1, content: 'hello'},
        {id: 2, content: 'hello2'},
        {id: 2, content: 'hello3'},
    ])
})

module.exports = router;

//testtest