const moongose=require('mongoose')

const courseschema=new moongose.Schema({
    title:String,
    instrutors:[{type:moongose.Schema.Types.ObjectId,ref:'instruter'}],
    articles:[{type:moongose.Schema.Types.ObjectId,ref:'article'}],
    users:[{type:moongose.Schema.Types.ObjectId,ref:'user'}],
    estimated:Number,
    rating:Number,
    pic: String,
    descrption:String,
    quiz:[{ type:moongose.Schema.ObjectId,ref:'quizes',default:[]}]
},{timestamps:true}) 

const course=moongose.model('course',courseschema)


const Enroledcourses=new moongose.Schema({
    courses:[{type:moongose.Schema.Types.ObjectId,ref:'course',default:[]}],
    userid:{type:moongose.Schema.Types.ObjectId,ref:'user'},
    quiztaken:[{
        quiz:{ type:moongose.Schema.ObjectId,ref:'quiz'},
        marks:{type:Number,default:0}
    }],
    compltedarticles: [{
        aid: { type: moongose.Schema.Types.ObjectId, ref: 'article' },
        cid: { type: moongose.Schema.Types.ObjectId, ref: 'course' }
      }],    
       status:[{
        course:{type:moongose.Schema.Types.ObjectId,ref:'course'},
        complte:{type:Boolean,default:false}
     }],

    progress:Number
}) 


const enrollC=moongose.model('enrolledCourses',Enroledcourses)

module.exports={course,enrollC}