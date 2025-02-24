const express = require('express');
const articleRouter = express.Router();
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, getcourseArticles, quiztime } = require('../controllers/articleController');
const { verify } = require('../middleware/middleware');
const multer = require('multer');

const upload=multer({dest:'images/artcleimg/'})


articleRouter.post('/',verify,upload.single('artimg'),createArticle);
articleRouter.get('/', getAllArticles);
articleRouter.get('/:aid', getArticleById);
articleRouter.get('/coursearticles/:cid',getcourseArticles)
articleRouter.put('/update/:id', updateArticle);
articleRouter.delete('/delete/:id', deleteArticle);
articleRouter.get('/quiz/:id', verify,quiztime);

module.exports = articleRouter;
