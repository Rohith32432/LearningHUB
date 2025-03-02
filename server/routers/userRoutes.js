const express = require('express');
const userRouter = express.Router();
const { login, signup, updateUser,favcourses, profile, takequiz, submitquiz, markComplte, forgot, forgotverify } = require('../controllers/userController');
const { verify } = require('../middleware/middleware');
const { recomed } = require('../useful/checkeligiblty');


userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/profile/:id', profile);
userRouter.put('/update/:userid', updateUser);
// userRouter.delete('/delete/:id', deleteUser);
userRouter.post('/forgot/:token',forgotverify,updateUser)
userRouter.post('/forgot',forgot)
userRouter.post('/quiz',takequiz)
userRouter.post('/submitquiz',verify,submitquiz)
userRouter.post('/fav/:cid',favcourses)
userRouter.post('/recomd',verify,recomed)
userRouter.post('/complte',verify,markComplte)

module.exports = userRouter;
