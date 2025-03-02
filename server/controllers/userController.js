const { enrollC } = require("../models/Courses");
const { user } = require("../models/User");
const jwt =require('jsonwebtoken');
const { generatepdf } = require("../useful/pdfGen");
const { createmail } = require("../useful/checkeligiblty");

async function login(req, res) {
  const {email,password}=req.body
    const loggeduser=await user.findOne({email:email,password:password}).populate('EnrolledCourse')
    if(loggeduser){
        const token=jwt.sign(`${loggeduser?._id}`,'shh')
        res.status(200).json({loggeduser:{...loggeduser?._doc,role:'user'},token})
    }
    else{

        res.status(404).send('user not found')
    }
}

async function signup(req, res) {
     const {name,email,password,age}=req.body
     const newuser=await user.create({name:name,email:email,password:password,age:age})
     if(newuser) res.status(201).json('user created sucessful')
     
}

async function updateUser(req, res) {
   const {name,password,age,courses}=req.body
   
   const {userid}=req.params
   const x=await user.findById(userid)
   const forgotid=await user.findById(req?.forgotid)
   if(x ) {
       const upuser=await user.updateOne({
        name:name | x.name,
        password:password | x.password,
        age:age | x.age,
        EnrolledCourse:[...x.EnrolledCourse,courses]
       })
       res.json(upuser)
   }
   if(forgotid){
    forgotid.password=password
    await forgotid.save()
    res.json('password changed')
   }
}


async function favcourses(req, res) {
    const {_id} =req?.user 
    const {cid} =req.params

    try {
        const userfav = new Set(req?.user.favcourses);
        userfav.add(cid)
        //  req?.user?.favcourses=[...userfav]
         await req?.user.save()
    } catch (error) {
        
    }
}

async function profile(req, res) {
    try {
        const { id } = req.params;
        
        let userx = await user.findById(id).populate('EnrolledCourse');
        if (!userx) {
            return res.status(404).json({ message: 'User not found' });
        }
        userx = { ...userx?._doc, role: 'user' };
        res.json(userx);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
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
async function submitquiz(req,res) {
    const {_id ,role}=req?.user
    
    const {quizid,marks,percentage,courseid}=req.body
    if(role =='user'){
        let xid,title
        const user=await enrollC.findOne({userid:_id}).populate('userid courses')
        user?.quiztaken.push({quiz:quizid,marks:marks})
        if(percentage>70){
            user.status.push({course:courseid,complte:true})
            const fc = user?.courses.find((e) => e._id.toString() === courseid.toString());
            title=fc.title
            xid=`${user?.userid?._id+fc.title}`
            
             generatepdf({name:user?.userid?.name,course:fc,id:xid})
        }
        await user.save()
        return res.status(200).json({ message: 'Quiz results saved successfully', marks,percentage,url:xid,title:title });

    }

    
}
async function markComplte(req, res) {
    const {_id, role} = req?.user;

    if (role !== 'user') {
        return res.status(401).json({ msg: 'You have no access' });
    }

    const { cid, aid } = req.body;

    try {
        const course = await enrollC.findOne({ userid: _id });

        if (course) {
            const alreadyMarked = course.compltedarticles.some(
                (item) => item.aid.toString() === aid.toString() && item.cid.toString() === cid.toString()
            );

            if (alreadyMarked) {
                course.compltedarticles = course.compltedarticles.filter(
                    (item) => !(item.aid.toString() === aid.toString() && item.cid.toString() === cid.toString())
                );
                await course.save();

                return res.json({ msg: 'Article unmarked successfully' });
            }

            course.compltedarticles.push({ aid, cid });

            await course.save();

            res.json({ msg: 'Marked as completed' });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred' });
    }
}

async function forgot(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        try {
            const foundUser = await user.findOne({ email });
            if (!foundUser) {
                return res.status(404).json({ message: "User not found." });
            }
            const resetToken = generateToken({ userId: foundUser._id });
            createmail({foundUser,resetToken})
            return res.status(200).json({ message: "Password reset email sent.", resetToken });

        } catch (error) {
            return res.status(500).json({ message: "An error occurred.", error });
        }

}

function forgotverify(req,res,next){
    
    const { token } = req.params;
    
    try {
        const decoded = jwt.verify(token, 'shh');
        req.forgotid=decoded?.userId
        
        return next()
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token." });
    }
}

function generateToken(data) {
    return jwt.sign(data, 'shh', { expiresIn: '1h' });
}



module.exports = {forgot, forgotverify,login,submitquiz, signup, updateUser, favcourses, markComplte,profile,takequiz };
