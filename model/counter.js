const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const counterSchema = new Schema({
    counterId: String,
});

module.exports = mongoose.model('Counter', counterSchema);
