const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://kumarastik0398:astik@cluster0.lcxjcaq.mongodb.net/visualization-data?retryWrites=true&w=majority')

module.exports = {
    connection
}