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
const {Server}=require('socket.io');
const { test } = require('./models/User');
const { Crouter } = require('./routers/CommentsRouter');

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
app.use('/api/comments',Crouter)


const server=app.listen(3003,()=>{
    console.log('listening at 3003');     
})


//web socket connection
// const io=new Server(server,{
//     cors:{
//         origin:'http://localhost:5173'
//     }
// })

// io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id);

//     socket.on('click', (data) => {
//         console.log(data, 'clicked');
//         socket.emit('click', 'you clicked');
//     });

//     socket.on('delete', async (id) => {
//         try {
//             await test.deleteOne({ _id: id });
//             const updatedData = await test.find();
//             io.emit('updateData', updatedData); // Send updated list to all clients
//         } catch (error) {
//             console.log('Delete Error:', error);
//         }
//     });
// });

app.get('/api/test',async(req,res)=>{
    const testdata=await test.find()
    res.json(testdata)
})

app.get('/api/test/:id',async(req,res)=>{
    const {id}=req.params
    try {
        await test.deleteOne({_id:id})
        res.send('deleted')
    } catch (error) {
        console.log(error);
        
    }
})
