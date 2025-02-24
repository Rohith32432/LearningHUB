const express = require('express');
const enrolledCourseRouter = express.Router();
const { createEnrolledCourse, getAllEnrolledCourses, getEnrolledCourseById, deleteEnrolledCourse, unEnroll } = require('../controllers/coursecontoller');
const { verify } = require('../middleware/middleware');


enrolledCourseRouter.post('/create', createEnrolledCourse);
enrolledCourseRouter.get('/',verify ,getAllEnrolledCourses);
enrolledCourseRouter.get('/:id', getEnrolledCourseById);
// enrolledCourseRouter.put('/update/:id', updateEnrolledCourse);
enrolledCourseRouter.post('/unenroll', unEnroll);

module.exports = enrolledCourseRouter;
