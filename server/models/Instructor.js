const moongose=require('mongoose')

const instruterschema=new moongose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:{type:String,lowercase:true},
    age:Number,
    courses:[{type:moongose.Schema.ObjectId,ref:'course'}],
},{timestamps:true})

const instruter= moongose.model('instruter',instruterschema)

module.exports={instruter}
