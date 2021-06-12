const film = require('../utils/movies');
const apiKey = process.env.API_KEY;

const routes = {
    home:(req, res) => {
        res.status(200).send('vista inicial/login')
    },
    // getSingUp: ,
    // postSingUp: ,
    // login:,
    // logout:,
    dashboard:(req, res) => {
        res.status(200).render('dashboard')
    },
     // getMovies:,
    searchTitle: async(req, res) => {
        let data = await film.getfilm(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${apiKey}&`)
        res.status(200).json(data)
    },
    myMovies: (req, res) => {
        res.status(200).render('admin')
    },
    createMovie:  (req, res) => {
        res.status(200).render('create')
    },
    postMovie: (req, res) => {
        // res.render('create')
        res.redirect('/movies')
        // res.status(200).json({message: 'Se ha guardado'})
    },
    // editMovie: (req, res) =>{
    //     let id = req.params.id
    //     res.status(200).json({message: `Se ha actualizado: ${id}`})
    // },
    // deleteMovie: (req, res) =>{
    //     res.status(200).json({message: 'Se ha borrado'})
    // }
}

module.exports = routes;
/* films:async(req, res) => {
    console.log(req.body.title);
    let data = await filmData.getfilm(`http://www.omdbapi.com/?t=${req.body.title}&apikey=${apikey}&`)
    console.log(data);
    res.status(200).render('film', {data})
},
searchFilm:async(req, res) => { //ALEJANDRO
    let data = await filmData.getfilm(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${apikey}&`)
    console.log(data);
    res.status(200).render('film', {data})
},
postFilm:async(req, res) => {
    res.redirect(`/film/${req.body.title2}`)
}, */