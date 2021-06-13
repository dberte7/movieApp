const router = require('express').Router(); 
const movie = require('../controllers/movie');

router.get('/', movie.home)
// router.get('/signup', movie.getSingUp)
// router.post('/signup', movie.postSingUp)
// router.post('/login', movie.login)
// router.post('/logout', movie.logout)
router.get('/dashboard', movie.dashboard)
router.get('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)
router.get('/movies', movie.myMovies)

module.exports = router;