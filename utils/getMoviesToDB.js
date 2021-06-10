const Film = require('../models/Film');

const moviesToDB = {
    arrayToDB: async (data) => {
            let movie = {
                //falta cambiar algunos de abajo
                title: data.Title,
                image: data.Poster,
                year: data.Year,
                director: data.Director,
                genre: data.Genre,
                runtime: data.Runtime,
                plot: data.Plot,
                actors: data.Actors,
                imdbRating: data.imdbRating,
                fav: false
            }
            const film = new Film(movie);
            try {
                const newFilm = await film.save();
                console.log(`Saved on DB: ${film.title}`)
            } catch (err) {
                res.status(400).json({ menssage: err.message })
            }
    }
} 

module.exports = moviesToDB;