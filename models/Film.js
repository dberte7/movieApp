const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

autoIncrement.initialize(connection);

const filmSchema = new Schema({
    movieId: { 
        type: Number
    },
    Title: {
        type: String,
        required: true,
        unique:true
        },
    Poster: {
        type: String,
        validate: {
            validator: text => {
                return text.indexOf('https://') === 0;
            },
        default: "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-1-300x450.jpg"
        }
        },
    Year: {
        type: String,
        required: true,
        },
    Director: {
        type: String,
        required: true
        },
    Genre: {
        type: String,
        required: true
        },
    Runtime: {
        type: String,
        required: true
        },
    RegisterDate: {
        type: Date,
        required: true,
        default: new Date()
        }
});


//filmSchema.plugin(autoIncrement.plugin, 'Film');
filmSchema.plugin(autoIncrement.plugin, { model: 'Film', field: 'movieId', startAt: 100 });

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;
