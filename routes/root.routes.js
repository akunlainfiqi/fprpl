const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('kalo kesini berarti belum login');
})

module.exports = router;