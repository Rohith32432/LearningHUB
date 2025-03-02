const { comments, msgmodel } = require("../models/Comments")
const { course } = require("../models/Courses")

async function createComment(req,res) {
    const {msg,aid,parentid,cid}=req.body
    const {_id}=req?.user
    const fetchcomt=await comments.findOne({articleid:aid,courseid:cid})
    const msgx=await msgmodel.create({message:msg,sender:_id,parent:parentid||null})
    if(!fetchcomt){
        const newcomment= await comments.create({messages: msgx?._id,articleid:aid,courseid:cid})
        return  res.json({msg:'created',newcomment,msgx})
    }
    const coursex=await course.findById(cid)
    if(coursex){
        coursex.intractions+=fetchcomt.messages.length
        await coursex.save()
    }
    fetchcomt.messages.push(msgx._id);
    await fetchcomt.save(); 
    return res.json({ message: 'Message added to existing comment', msg:msgx });
}
 
async function getcommentsbyid(req,res) {
    const {id}=req.params
    const articlecomments=await comments.findOne({articleid:id}).populate({
        path:'messages'
    })
    res.json(articlecomments)
    
}
async function deleteComment(params) {
    
}

module.exports={createComment,deleteComment,getcommentsbyid}