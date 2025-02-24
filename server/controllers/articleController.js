const { article, mainquizes } = require("../models/Article");
const { course } = require("../models/Courses");
const fs =require('fs')

async function createArticle(req, res) {
   const {title,content,courseid,links=''}=req.body
   const {originalname='',filename,size}=req?.file
   const {role} =req?.user 
   if((size/(1024*1024))>10){
     return  res.status(500).json({message:'file is larger than 10MB'})
   }
   if(role!='user'){
       await fs.rename(`images/artcleimg/${filename}`,`images/artcleimg/${originalname}`,(err)=>{if(err) throw err})
    const indcourse=await course.findById(courseid)
    if(indcourse){
        const data={
            title:title,
            content:content,
            courseid:courseid,
            pic: originalname ?`artcleimg/${originalname}`:null,
            references:links || null
        }
     const newarticle=await article.create(data)
     indcourse.articles.push(newarticle?._id)
     await indcourse.save()
 
     res.json({message:'article added'})
    }

   }
}

async function getAllArticles(req, res) {
    const artcles=await article.find().populate('courseid')
    res.json(artcles)
}

async function getArticleById(req, res) {
    // Your get article by ID logic here
    const {aid}=req.params
    const artcles=await article.findById(aid)
   
    res.json(artcles)
}



async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const { title, content, courseid } = req.body;
        const { originalname, filename, size } = req?.file || {};
        const { role } = req?.user;

        const existingArticle = await article.findById(id);
        if (!existingArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        if (size && size / (1024 * 1024) > 10) {
            return res.status(400).json({ message: 'File is larger than 10MB' });
        }

        existingArticle.title = title || existingArticle.title;
        existingArticle.content = content || existingArticle.content;
        existingArticle.courseid = courseid || existingArticle.courseid;

        if (role !== 'user' && filename) {
            await fs.rename(`images/artcleimg/${filename}`, `images/artcleimg/${originalname}`, (err) => {
                if (err) throw err;
            });

            existingArticle.pic = `artcleimg/${originalname}`;
        }

        await existingArticle.save();
        res.json({ message: 'Article updated successfully', article: existingArticle });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}


async function deleteArticle(req, res) {
    
}


async function quiztime(req, res) {
    const {role} =req?.user
    const {id}=req.params
    if(role=='user'){
        const quizzes=await mainquizes.findById(id).populate('questions')
        if(quizzes){
            res.json(quizzes)
        }
    }
}
async function getcourseArticles(req, res) {
    const {cid}=req.params
    const indcourse=await course.findById(cid).populate('articles quiz')
    if(indcourse){
        res.json(indcourse)
    }
}


module.exports = {quiztime, createArticle,getAllArticles, getArticleById, getcourseArticles,updateArticle, deleteArticle };
