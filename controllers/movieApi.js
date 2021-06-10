const Film = require('../models/Film');
const movies = require('../utils/movies');
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY

const routes = {
    getMoviesDB: async (req, res)=>{
        console.log(req);
        console.log(res);
        console.log("Tengo que hacer un GET the todas las peliculas contra MongoDB");
    },
    getMovies: async (req, res)=>{

        let title = req.query.s
        let search = [];

        try {
            let data = await movies.getfilm(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=${apikey}&`);

            for (let index = 0; index < data.Search.length; index++) {
                let id = data.Search[index].imdbID;
                let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                search.push(data2);
                getMoviesToDB.arrayToDB(data2)
            }

            res.status(200).json(search);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    searchTitleDB: async (req, res) => {
        let title = req.query.title;
        try {
            const data = await Film.find({"title":title})
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    searchTitle: async (req, res) => {
        let title = req.params.title;
        try {
            let data = await movies.getfilm(`http://www.omdbapi.com/?t=${title}&apikey=${apikey}&`);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}
module.exports = routes;