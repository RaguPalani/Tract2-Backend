const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');

router.use(auth); // protect all task routes

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', validateObjectId, taskController.getTask);
router.put('/:id', validateObjectId, taskController.updateTask);
router.delete('/:id', validateObjectId, taskController.deleteTask);

module.exports = router;