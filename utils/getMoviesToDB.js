const Film = require('../models/Film');
const fetch = require('node-fetch');

const moviesToDB = {
    arrayToDB: async (movie) => {
            Film.exists({ Title: movie.Title }, async (err, result) => {
                if (err) {
                    console.log(error);
                } else {
                    if (!result){
                        const film =  new Film(movie);
                        try {
                            const newFilm = await film.save();
                            //console.log(`Saved on DB: ${film.Title}`)
                        } catch (err) {
                            console.log(`menssage: ${err.message}`)
                        }
                    } else {
                        console.log("Already in db");
                    }
                }
            });
    },
    findDbId: async (titleQ) => {
        Film.exists({ Title: titleQ }, async (err, result) => {
            if (err) {
                console.log(error);
            } else {
                if (result){
                    try {
                        const dataDb = Film.findOne({Title:titleQ}).lean().exec(async (err, movie) => {

                            //let id = "tt" + movie._id

                            let dbSearch = {
                                dbSearch: "true",
                                Title: movie.Title,
                                Year: movie.Year,
                                Runtime: movie.Runtime,
                                Genre: movie.Genre,
                                Director: movie.director,
                                Poster: movie.Poster,
                                imdbID: movie._id,
                            }
                            
                            let options = {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                    },
                                body: JSON.stringify(dbSearch)
                            }
                        
                            let response = await fetch("http://localhost:3000/search", options)
                            let data = await response.json()
                            return data;
                        })
                    } catch (err) {
                        console.log(err);
                        //res.status(500).json({ message: err.message });
                    }
                } else {
                    console.log(`${result} not in db`);
                }
            }
        })
    },
}; 

module.exports = moviesToDB;

