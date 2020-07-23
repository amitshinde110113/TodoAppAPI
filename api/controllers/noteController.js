const mongoose = require('mongoose');
const Note = require('../models/note');



exports.create = (req, res, next) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        title: req.body.title,
        description: req.body.description
    });
    note.save().then((result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(401).json(err);
    })
}

exports.getNotes = async (req, res, next) => {
    const page = req.params.page;
    const skip = page * 10;
    const totalCount = await Note.find({ user: req.currentUser._id }).count()
    Note.find({ user: req.currentUser._id }).populate('user').skip(skip).limit(10).sort({ 'createdAt': -1 }).then(result => {
        res.status(201).json({ totalCount: totalCount,notes: result });
    }).catch(err => {
        res.status(401).json(err);
    })
}
exports.getNoteById = (req, res, next) => {
    const id = req.params.id;
    Note.findOne({ _id: id }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(404).json(err);
    })
}


exports.update = (req, res, next) => {
    var data = req.body;
    var id = req.params.id;
    Note.findByIdAndUpdate(id, { $set: data }, { new: true }).exec()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(404).json({ error: err });
        });
}

exports.remove = (req, res, next) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id).exec()
        .then((Note) => {
            res.status(201).json(Note);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

