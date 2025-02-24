const express=require('express')
const cors=require('cors') 
const { connection } = require('./config/db')
const app=express()
const userRouter = require('./routers/userRoutes');
const instructorRouter = require('./routers/instruterRoutes');
const articleRouter = require('./routers/artcleRoutes');
const courseRouter = require('./routers/courseRoute');
const enrolledCourseRouter = require('./routers/enrolledCourseRouter');
const path=require('path')
const multer=require('multer')

//middleware
app.use(express.json())
app.use(cors())
connection()

app.use('/certicates',express.static(path.join(__dirname,'Certificates')))
app.use('/image',express.static(path.join(__dirname,'images')))

app.use('/api/users', userRouter);
app.use('/api/instructors', instructorRouter);
app.use('/api/articles', articleRouter);
app.use('/api/courses', courseRouter);
app.use('/api/enrolledCourses', enrolledCourseRouter);



app.listen(3003,()=>{
    console.log('listening at 3003');
     
})