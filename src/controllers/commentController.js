const Comment = require('../models/Comment');

async function getAll(req, res, next) {

  try {
    const comments = await Comment.find().populate('user', 'username').populate('movie', 'title');
    res.json(comments);
  } catch (err) { next(err); }
};

async function create(req, res, next) {

  try {
    const data = { ...req.body, user: req.user.id };
    const comment = await Comment.create(data);
    res.status(201).json(comment);
  } catch (err) { next(err); }
};

async function update(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
    comment.text = req.body.text;
    await comment.save();
    res.json(comment);
  } catch (err) { next(err); }
};

async function remove(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
    await comment.remove();
    res.json({ message: 'Deleted successfully' });
  } catch (err) { next(err); }
};


module.exports = {getAll, create, update, remove}