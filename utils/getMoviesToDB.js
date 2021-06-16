const Film = require('../models/Film');

const moviesToDB = {
    arrayToDB: async (data) => {

        console.log(data);
    
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

