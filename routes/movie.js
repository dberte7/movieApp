const router = require('express').Router(); 
const movie = require('../controllers/movie');

router.get('/', movie.signIn)
// router.get('/signup', movie.getSingUp)
// router.post('/signup', movie.postSingUp)
// router.post('/login', movie.login)
// router.post('/logout', movie.logout)
router.post('/dashboard', movie.dashboard)
router.get('/search', movie.getMovies)
router.post('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)
router.post('/movies', movie.myMovies)
// router.post('/createmovie', movie.createMovie)
// router.put('/editmovie/:id', movie.editMovie)
// router.delete('/removemovie', movie.deleteMovie)

module.exports = router;