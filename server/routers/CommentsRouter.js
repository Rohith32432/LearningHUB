const express=require('express')
const { createComment, getcommentsbyid, deleteComment } = require('../controllers/commentsController')
const { verify } = require('../middleware/middleware')
const Crouter=express.Router()

Crouter.get('/:id',getcommentsbyid)
Crouter.post('/',verify,createComment)
Crouter.delete('/remove',deleteComment)

module.exports={Crouter}