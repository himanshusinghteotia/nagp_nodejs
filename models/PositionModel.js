const mongoose = require('mongoose')

const PositionSchema = new mongoose.Schema({
    projectName: String,
    clientName: String,
    technologies: [{type: String}],
    role: String,
    jobDescription: String,
    status: Boolean,
    createdby: String
})

module.exports = mongoose.model('Position', PositionSchema);