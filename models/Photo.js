const mongoose = require('mongoose');

const Photo = mongoose.model('Photo', new mongoose.Schema({ 
    link: String,
    name: String,
    likes: Number,
    comments: [String],
    date: Date,
}));

module.exports = Photo;