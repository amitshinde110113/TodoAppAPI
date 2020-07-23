const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoUser'
    },
    title: String,
    description: String,
});
noteSchema.plugin(timestamps);
module.exports = mongoose.model('Note', noteSchema);