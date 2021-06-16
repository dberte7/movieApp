const Film = require('../models/Film');

const moviesToDB = {
    arrayToDB: async (data) => {
        let movie = {};
        
        if (data.Poster == "N/A") {
            movie = {
                title: data.Title,
                image: "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-1-696x1024.jpg",
                year: data.Year,
                director: data.Director,
                genre: data.Genre,
                runtime: data.Runtime,
            }
        } else {
            movie = {
                title: data.Title,
                image: data.Poster,
                year: data.Year,
                director: data.Director,
                genre: data.Genre,
                runtime: data.Runtime,
                }
            }
            Film.exists({ title: searchTitle }, async (err, result) => {
                if (err) {
                    console.log(error);
                } else {
                    if (!result){
                        const film =  new Film(movie);
                        try {
                            const newFilm = await film.save();
                            //console.log(`Saved on DB: ${film.title}`)
                        } catch (err) {
                            console.log(`menssage: ${err.message}`)
                        }
                    } else {
                        console.log("Already in db");
                    }
                }
            });
    }
} 

module.exports = moviesToDB;

