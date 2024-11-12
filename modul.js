
const mongoose = require("mongoose");

const UktiSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    password: String, 
    title:String,
    content:String,
    mood:String,
    date:String,
    id:String
});

const Ukti = mongoose.model('Ukti', UktiSchema);

module.exports = Ukti;
