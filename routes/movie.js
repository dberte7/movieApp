const router = require('express').Router(); 
const movie = require('../controllers/movie')
const checkAuth = require("../middleware/auth");

router.get('/', movie.inicio)

router.post('/signin', checkAuth, movie.signIn)

router.get('/signUp', movie.signUp)
router.post('/signUp', movie.addUser)

router.get('/dashboard', movie.dashboard)
router.get('/search', movie.getMovies)
router.post('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)
router.get('/movies', movie.myMovies)
router.post('/movies', movie.myMovies) 
router.post('/createMovie', movie.postMovie)
router.post('/editMovie', movie.editMovie)
router.put('/editMovie/:id', movie.putMovie)
router.post('/removeMovie', movie.deleteMovScreen)
router.delete('/removeMovie', movie.deleteMovie)

module.exports = router;