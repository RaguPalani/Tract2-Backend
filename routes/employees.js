const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');

router.use(auth); // protect all employee routes

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', validateObjectId, employeeController.getEmployee);
router.put('/:id', validateObjectId, employeeController.updateEmployee);
router.delete('/:id', validateObjectId, employeeController.deleteEmployee);

module.exports = router;