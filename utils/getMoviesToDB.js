const Film = require('../models/Film');

const moviesToDB = {
    arrayToDB: async (data) => {
        console.log("A por ellos");
        console.log(data);
        
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
                raiting: data.raiting,
                reviews: data.reviews,
                fav: false
            }
            const film = new Film(movie);
            try {
                const newProduct = await product.save();
                console.log(`Saved on DB: ${movie.title}`)
            } catch (err) {
                res.status(400).json({ menssage: err.message })
            }
    }
} 

module.exports = moviesToDB;