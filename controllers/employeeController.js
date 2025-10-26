const Employee = require('../models/Employee');
const Task = require('../models/Task');
const { employeeCreateSchema, employeeUpdateSchema } = require('../validators/employeeValidator');

exports.createEmployee = async (req, res, next) => {
  try {
    const { error, value } = employeeCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const existing = await Employee.findOne({ email: value.email });
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const emp = new Employee(value);
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Employee.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Employee.countDocuments(query)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    const tasks = await Task.find({ assignedTo: emp._id }).sort({ dueDate: 1 });
    res.json({ employee: emp, tasks });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { error, value } = employeeUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const emp = await Employee.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};


// Delete employee and unassign their tasks
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Unassign all tasks assigned to this employee
    await Task.updateMany(
      { assignedTo: employee._id },
      { $unset: { assignedTo: "" } }
    );

    // Delete the employee record
    await Employee.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Employee deleted successfully and tasks unassigned'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }

};