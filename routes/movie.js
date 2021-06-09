const router = require('express').Router(); 
const movie = require('../controllers/movie');

router.get('/', movie.home)
router.get('/dashboard', movie.dashboard)
/* router.get('/search/:title', movie.searchMovie)
router.get('/search', movie.searchMovies)
router.get('/movies', movie.myMovies)
router.post('/login', movie.login)
router.post('/logout', movie.logout)
router.post('/createMovie', movie.createMovie)
router.put('/editMovie/:id', movie.editMovie)
router.delete('/removeMovie', movie.deleteMovie)
 */
module.exports = router;
