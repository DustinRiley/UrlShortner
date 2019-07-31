const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const urlDataSchema = new Schema({
    _id: String,
    url: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UrlData', urlDataSchema);
