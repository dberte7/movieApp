const router = require('express').Router(); 
const pages = require('../controllers/pages');

router.get('/', )
router.get('/dashboard', )
router.get('/search/:title', )
router.get('/search', )
router.get('/movies', )
router.post('/login', )
router.post('/logout', )
router.post('/createMovie', )
router.put('/editMovie/:id', )
router.delete('/removeMovie', )

module.exports=router;