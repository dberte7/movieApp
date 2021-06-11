const Film = require('../models/Film');

const moviesToDB = {
    arrayToDB: async (data) => {
            let movie = {
                title: data.Title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
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
                console.log(`menssage: ${err.message}`)
            }
    }
} 

module.exports = moviesToDB;