const mongoose = require('mongoose');
module.exports = (req, res, next) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  next();
};