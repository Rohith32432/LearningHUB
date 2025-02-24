const { quiz, mainquizes } = require("../models/Article");
const { course } = require("../models/Courses");
const { instruter } = require("../models/Instructor");
const jwt=require('jsonwebtoken')

async function createInstructor(req, res) {
    const {name,email,password,age}=req.body
    const newuser=await instruter.create({name:name,email:email,password:password,age:age})
    if(newuser) res.status(201).json('instruter created sucessful '+newuser)
}

async function getAllInstructors(req, res) {
 
res.json( await instruter.find())
}
async function getInstCourses(req, res) {
    try {
        const { id } = req.params;
        let userx = await instruter.findById(id).populate('courses')
        if (!userx) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(userx);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function getInstructorById(req, res) {
    try {
        const { id } = req.params;
        let userx = await instruter.findById(id).populate('courses')
        if (!userx) {
            return res.status(404).json({ message: 'User not found' });
        }
        userx = { ...userx?._doc, role: 'instructor' };
        res.json(userx);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
async function login(req, res) {
    const {email,password}=req.body
    const loggeduser=await instruter.findOne({email:email,password:password})
    if(loggeduser){
        const token=jwt.sign(`${loggeduser?._id}`,'shh')
        res.status(200).json({loggeduser:{...loggeduser?._doc,role:'instructor'},token})
    }
    else{

        res.status(404).send('user not found')
    }
}


async function updateInstructor(req, res) {
    // Your update instructor logic here
}

async function deleteInstructor(req, res) {
    // Your delete instructor logic here
}

async function createquiz(req, res) {
    const { role } = req?.user;
    
    if (role !== 'inst') {
        return res.status(403).json('Unauthorized');
    }
    
    const { title, cid } = req.body;
    
    const existingQuiz = await mainquizes.findOne({ courseid: cid });
    console.log(existingQuiz);
    
    if (existingQuiz) {
      return res.json(existingQuiz);
    } else {
        const courseData = await course.findById(cid);
        
        if (!courseData) {
            return res.status(404).json('Course not found');
        }
        
        const quiz = await mainquizes.create({
            title: title,
            insterid: req?.user?._id,
            courseid: cid,
        });
        
        courseData.quiz.push(quiz?._id);
        await courseData.save();
    
        return res.json(quiz);
    }
}

async function questions(req, res) {
   const {question,options,ans}=req.body
   const{id}=req.params
   try{
       const fquiz=await mainquizes.findById(id)
        if(fquiz){
       const ques= await quiz.create({
            question:question,
            ans:ans,
            options:options,
        })
        fquiz.questions.push(ques?._id)
        await fquiz.save()
        res.status(201).json('saved')
       }
   }
   catch(err){
    console.log(err);
    res.status(500).json('err')
    
   }

}
module.exports = { createInstructor, getAllInstructors, getInstructorById, createquiz,login,
    getInstCourses,updateInstructor, deleteInstructor ,questions};
