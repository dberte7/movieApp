const router = require('express').Router(); 
const movie = require('../controllers/movie')

router.get('/', movie.signIn)
router.get('/signup', movie.getSingUp)
router.post('/signup', movie.postSingUp)
router.post('/dashboard', movie.dashboard)
router.get('/search', movie.getMovies)
router.post('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)
router.post('/movies', movie.myMovies)

module.exports = router;