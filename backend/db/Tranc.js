const mongoose = require('mongoose');

const trancSchema = new mongoose.Schema({
          id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        sold: Boolean,
        dateOfSale: Date,
        page:Number
})

module.exports = mongoose.model("Tranc",trancSchema);