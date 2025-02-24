const { mainquizes } = require("../models/Article");
const { course, enrollC } = require("../models/Courses");
const { user } = require("../models/User");
const { checkeligblity } = require("../useful/checkeligiblty");
// const { generatepdf } = require("../useful/pdfGen");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs=require('fs')

async function createCourse(req, res) {
    const {title,estimated,descrption}=req.body || req?.file
   const {originalname,filename,size}=req?.file
    const {_id,role} =req?.user 
    if((size/(1024*1024))>10){
      return  res.status(500).json({message:'file is larger than 10MB'})
    }
   await fs.rename(`images/${filename}`,`images/${originalname}`,(err)=>{if(err) throw err
    })
    if(role!='user'){
        const newcourse=await course.create({title:title,instrutors:[_id],estimated:estimated,pic:originalname,descrption:descrption})
        req?.user?.courses.push(newcourse?._id)
        await req?.user.save()
        res.status(201).json({...newcourse?._doc,message:'course crated'})
    }
   
}

async function recomed(req,res) {
   
    try {
        const courses = await course.find().select('-articles -users -quiz'); 
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
    
      // Construct the prompt with dynamic course name
        // let prompt = `
        // "
        // mydata = ${courses}
        // Given the following list of courses in JSON format, recommend courses for a user who has completed '${courseName}'. 
        // If no related courses are found, return 'No specific courses in DB'.
        // For each recommended course, provide complete details, including course ID, name, instructor, duration (weeks), credits, category, 
        // and a brief reason explaining why it's recommended. Additionally, suggest new relevant courses that are not in the given list. 
        // The output should be in valid JSON format."
        // `;
    
        // const result = await model.generateContent(prompt)
        // // Send the list of courses as a JSON response
        // res.json(result.response.text());
    // const result = await model.generateContent(prompt)

}

async function getAllCourses(req, res) {
   
    try {
        // Fetch courses with populated instructor data
        const courses = await course.find().populate('instrutors');
        res.json(courses)
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
 
}


async function getCourseById(req, res) {
    const {id}=req.params
    const indcourse = await course.findById(id).populate('instrutors');
   res.json( indcourse)
    // Your get course by ID logic here
}

async function getquiz(req, res) {
    const {id}=req.params
    const indcourse = await course.findById(id).populate('instrutors');
   res.json( indcourse)
    // Your get course by ID logic here
}


async function updateCourse(req, res) {
    const {cid,title,instid,estimated}=req.body
    const {_id,role} =req?.user
    const updcourse=await course.findById(cid)    
    if(role!='user' && _id && updcourse){
        updcourse.title= title||  updcourse.title
        updcourse.estimated=estimated ||updcourse.estimated
        if(!updcourse.instrutors.includes(instid)){
            updcourse.instrutors=  updcourse.instrutors.push(instid)
        }
        await updcourse.save()
    }
    res.status(201).json({...newcourse?._doc,msg:'course crated'})
   
}

async function deleteCourse(req, res) {
    // Your delete course logic here
}

async function search(req, res) {
    try {
        const { title, instructor, rating, estimated } = req.body; // Get search parameters from query 
        const filter = {};
        
        // Build the filter based on query params
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; 
        }
        if (instructor) {
            filter.instructors = mongoose.Types.ObjectId(instructor); 
        }
        if (rating) {
            filter.rating = { $gte: rating };
        }
        if (estimated) {
            filter.estimated = { $lte: estimated }; 
        }

        const courses = await course.find(filter).populate('instrutors').populate('articles').populate('users').populate('quiz');

        
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong during the search." });
    }
}


async function createEnrolledCourse(req, res) {
    const {title,courseid,userid}=req.body
    try {
        const check=await enrollC.findOne({userid:userid})
        if(check){
            if (!check.courses.includes(courseid)) {
                check.courses.push(courseid);
                await check.save(); 
            }
        }
        else{
           const enroll= await enrollC.create({courses:[courseid],userid:userid})
           await user.updateOne({ _id: userid }, { $set: { EnrolledCourse: enroll._id } });
        }
        res.send('enrolled sucessful')
    } catch (error) {
        console.log(error);
        
    }
    
}

async function getAllEnrolledCourses(req, res) {
    const userid  = req?.user._id;
    const {type}=req.query
    if(type=='context'){
        const check = await enrollC.findOne({ userid: userid }).populate('courses quiztaken status'); 
        res.json(check)
    }
else {
    const check = await enrollC.findOne({ userid: userid }).populate('courses','-quiztaken -status -compltedarticles');   

    if(check)
      res.json(check.courses)
 }
}  

async function getEnrolledCourseById(req, res) {
    // Your get enrolled course by ID logic here
}

async function takequiz(req, res) {
    const {_id}=req?.user
    const {quizid,options}=req.body
    try {
        const quiz=await mainquizes.findById(quizid).populate('questions')
        let marks

        if(quiz){
            marks=0
            quiz?.questions.forEach((e)=>{
                if(options?.questionid==e?._id){
                    options?.ans==e.ans && marks++ 
                } 
            })
        }
        else{
            return res.status(404).json({ msg: 'Quiz not found '});
        }
    
        const user=await enrollC.findOne({userid:_id}).populate('userid courses')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
             user?.quiztaken.push({quiz:quizid,marks:marks})
             const percentage = (marks / quiz?.questions.length) * 100;
             if(percentage>70){
                user.status.push({course:quiz.courseid,complte:true})
                const fc=user?.courses.forEach((e)=>{
                    return e._id===quiz.courseid
                })
                // generatepdf({name:user?.userid?.name,course:fc})
             }
            await user.save()
            return res.status(200).json({ message: 'Quiz results saved successfully', marks,percentage });

        
    } catch (error) {
        console.log(error);
        
    }
}


async function unEnroll(req, res) {
    const { userid, courseid } = req.body;
    try {
       const check = await enrollC.findOne({ userid: userid }).populate('courses');   
        if (check) {
           check.courses = check.courses.filter((e) => e?._id.toString() !== courseid);
            await check.save();
        }
        
        res.json({message:'Unenrolled successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred');
    }
}



module.exports = { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse,takequiz 
  ,search ,recomed , createEnrolledCourse, getAllEnrolledCourses, getEnrolledCourseById, unEnroll 
};
