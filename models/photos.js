var mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("Photo", photoSchema)