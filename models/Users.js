const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
        },
    password: {
        type: String,
        required: true,
        unique:true
        },
    isLoggedIn: {
        type: Boolean,
        default: false
        },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
        }
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;