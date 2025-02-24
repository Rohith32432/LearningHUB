const express = require('express');
const courseRouter = express.Router();
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, recomed, search } = require('../controllers/coursecontoller');
const { verify } = require('../middleware/middleware');
const multer = require('multer');
const upload=multer({dest:'images/'})

courseRouter.post('/', verify,upload.single('courseimg'),createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/update/:id', updateCourse);
courseRouter.delete('/delete/:id', deleteCourse);
courseRouter.post('/search', search);
courseRouter.get('/recomend',recomed)


module.exports = courseRouter;
