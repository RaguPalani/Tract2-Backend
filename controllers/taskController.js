const Task = require('../models/Task');
const Employee = require('../models/Employee');
const { taskCreateSchema, taskUpdateSchema } = require('../validators/taskValidator');

exports.createTask = async (req, res, next) => {
  try {
    const { error, value } = taskCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    if (value.assignedTo) {
      const emp = await Employee.findById(value.assignedTo);
      if (!emp) return res.status(400).json({ error: 'Assigned employee not found' });
    }

    const task = new Task(value);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, priority, assignedTo, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Task.find(query).populate('assignedTo', 'name email position').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Task.countDocuments(query)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email position');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { error, value } = taskUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    if (value.assignedTo) {
      const emp = await Employee.findById(value.assignedTo);
      if (!emp) return res.status(400).json({ error: 'Assigned employee not found' });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true }).populate('assignedTo', 'name email position');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};