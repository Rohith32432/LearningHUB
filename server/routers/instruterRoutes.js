const express = require('express');
const instructorRouter = express.Router();
const { createInstructor, getAllInstructors, getInstructorById, updateInstructor, deleteInstructor, createquiz, questions, login, getInstCourses } = require('../controllers/instruterController');
const { verify } = require('../middleware/middleware');

instructorRouter.post('/signup',createInstructor);
instructorRouter.post('/login', login);
// instructorRouter.get('/', getAllInstructors);
instructorRouter.get('/', getAllInstructors);
instructorRouter.get('/my/:id', getInstCourses);
instructorRouter.get('/profile/:id', getInstructorById);
instructorRouter.put('/update/:id', updateInstructor);
instructorRouter.post('/quiz/:id', verify,questions);
instructorRouter.post('/quiz',verify,createquiz)

module.exports = instructorRouter;
