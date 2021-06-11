const Film = require('../models/Film');
const movies = require('../utils/movies');
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY;

const routes = {
    home:(req, res) => {
        res.status(200).send('vista inicial/login')
    },
    // getSingUp: ,
    // postSingUp: ,
    // login:,
    // logout:,
    dashboard:(req, res) => {
        res.status(200).send('dashboard')
    },
     // getMovies:,
    searchTitle: async(req, res) => {
        let titleQ = req.params.title
        let search = [];
        try {
            let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
            for (let index = 0; index < data.Search.length; index++) {
                let id = data.Search[index].imdbID;
                let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                search.push(data2);
                getMoviesToDB.arrayToDB(data2);
            }
            res.status(200).json(search);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAllMovies: async (req, res) => {
        try {
            const data = await Film.find();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    myMovies:async (req, res) =>{
        try {
            const data = await Film.find({fav:"true"})
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createMovie: async (req, res) => {
        res.status(200).json({message: 'Se ha guardado'})
    },
    editMovie: (req, res) =>{
        let id = req.params.id
        res.status(200).json({message: `Se ha actualizado: ${id}`})
    },
    deleteMovie: (req, res) =>{
        res.status(200).json({message: 'Se ha borrado'})
    }
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