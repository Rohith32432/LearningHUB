const moongose=require('mongoose')

const userschema=new moongose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:{type:String,lowercase:true},
    age:Number,
    EnrolledCourse:{type:moongose.Schema.ObjectId,ref:'enrolledCourses'},
    favcourses:[[{type:moongose.Schema.ObjectId,ref:'courses'}]],
    createdAt:{type:Date,default:new Date()},
},{timestamps:true})

const user= moongose.model('user',userschema)

const testschema=new moongose.Schema({
    name:String,
})
const test=moongose.model('test',testschema)
module.exports={user,test}