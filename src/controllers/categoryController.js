const Category = require('../models/category');

async function getAll(req, res, next) {

  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) { next(err); }
};
async function getOne(req, res, next) {

  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) { next(err); }
};

async function create(req, res, next) {

  try {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (err) { next(err); }
};

async function update(req, res, next) {

  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) { next(err); }
};

async function remove(req, res, next) {

  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) { next(err); }
};


module.exports = {getAll, getOne, create, update, remove}