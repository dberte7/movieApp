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
router.post('/createMovie', movie.postMovie)
router.post('/editMovie', movie.editMovie)
router.post('/removeMovie', movie.deleteMovie)

module.exports = router;