const mongoose=require('mongoose')

const msgschema=new mongoose.Schema({
    message:String,
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    parent:{type:mongoose.Schema.Types.ObjectId,ref:'msg',default:null},
},{timestamps:true})

const commentschema=new mongoose.Schema({
    articleid:{type:mongoose.Schema.Types.ObjectId,ref:'articles'},
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:'msg'}],
    courseid:{type:mongoose.Schema.Types.ObjectId,ref:'course'},
},{timestamps:true})

const msgmodel = mongoose.model('msg', msgschema);
const comments = mongoose.model('comments', commentschema);


module.exports={msgmodel,comments}