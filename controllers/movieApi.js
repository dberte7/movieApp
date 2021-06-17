const Film = require('../models/Film');
const movies = require('../utils/movies');
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY

const routes = {
    getMovies: async (req, res)=>{
        let titleQ = req.query.s
        let search = [];
        try { // primero fech luego bd
            let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
            if (data.Response === false) {
              // comprobar en la base de datos y si no hay resultados dar error.
            res.status(500).json({ message: `${data.Error}` });
            } else {
                for (let index = 0; index < data.Search.length; index++) {
                let id = data.Search[index].imdbID;
                let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                search.push(data2);
            }
              // comprobar en la base de datos
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
        res.status(200).json(search);        
    },
    searchTitle: async (req, res) => {
        let titleQ = req.params.title;
                    try {
                        let data = await movies.getfilm(`http://www.omdbapi.com/?t=${titleQ}&apikey=${apikey}&`);
                        res.status(200).json(data);
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
    },
    fav: async (req, res) => {
        console.log(req.body);
    }
}

module.exports = routes;