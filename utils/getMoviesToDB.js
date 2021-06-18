const Film = require('../models/Film');

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
    }
}; 

//moviesToDB.findDbId("Lucia y el sexo");
//moviesToDB.findDbId("Tierra");

module.exports = moviesToDB;

