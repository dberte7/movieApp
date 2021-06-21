const router = require('express').Router(); 
const movie = require('../controllers/movie')
const checkAuth = require("../middleware/auth");
const verifyToken = require("../middleware/cookie");

router.get('/', movie.inicio)
router.post('/signIn', checkAuth, movie.signIn)
router.get('/signUp', movie.signUp)
router.post('/signUp', movie.addUser)
router.get('/dashboard', verifyToken, movie.dashboard)
router.get('/search', verifyToken, movie.getMovies)
router.post('/search', movie.getMovies)
router.get('/search/:title', verifyToken, movie.searchTitle)
router.post('/search/:title', movie.fav)
router.get('/movies', verifyToken, movie.myMovies)
router.post('/movies',verifyToken, movie.myMovies) 
router.post('/createMovie', movie.postMovie)
router.post('/editMovie', movie.editMovie)
router.put('/editMovie/:id', movie.putMovie)
router.post('/removeMovie', movie.deleteMovScreen)
router.delete('/removeMovie', movie.deleteMovie)

module.exports = router;