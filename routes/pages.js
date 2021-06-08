const router = require('express').Router(); 
const pages = require('../controllers/pages');

router.get('/', pages.home)
router.get('/dashboard', pages.dashboard)
router.get('/search/:title', pages.searchMovie)
router.get('/search', pages.searchMovies)
router.get('/movies', pages.myMovies)
router.post('/login', pages.login)
router.post('/logout', pages.logout)
router.post('/createMovie', pages.createMovie)
router.put('/editMovie/:id', pages.editMovie)
router.delete('/removeMovie', pages.deleteMovie)

module.exports = router;