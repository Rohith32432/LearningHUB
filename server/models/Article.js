const moongose=require('mongoose')

const artcleschema=new moongose.Schema({
    title:String,
    content:{type:String,lowercase:true},
    conpleted:{type:Boolean,default:false},
    like:{type:Number,default:0},
    pic:String,
    references:String,
    courseid:{type:moongose.Schema.Types.ObjectId,ref:'course'}
},{timestamps:true})

const article=moongose.model('article',artcleschema)


const quizes=new moongose.Schema({
    title:String,
    questions:[{type:moongose.Schema.Types.ObjectId,ref:'quiz'}],
    insterid:[{type:moongose.Schema.Types.ObjectId,ref:'instruter'}],
    courseid:{type:moongose.Schema.Types.ObjectId,ref:'course'}
})

const questionSchema = new moongose.Schema({
    question: String,
    options: [{ type: String }],
    ans: Number
});

const quiz=  moongose.model('quiz',questionSchema)

const mainquizes=  moongose.model('quizes',quizes)

module.exports={article,quiz,mainquizes}